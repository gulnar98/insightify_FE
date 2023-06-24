import { getDatabase } from "@/lib/mongodb";
import { getGeolocationByIp } from "@/lib/utils";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

function getAllNodesByTagNames (records, tagNames: string[]) {
    let tags = [];
    for(let record of records) {
        if (record?.type !== 2) {
            continue;
        }

        if (
            tagNames.includes(record?.data?.node?.tagName?.toLowerCase()) ||
            tagNames.includes(record?.tagName?.toLowerCase())
        ) {
            tags.push(record);
        } else if (record?.data?.node?.childNodes?.length) {
            const tag = getAllNodesByTagNames(record?.data?.node?.childNodes, tagNames);
            if (tag) {
                tags = tags.concat(tag);
            }
        } else if (record?.childNodes?.length) {
            const tag = getAllNodesByTagNames(record?.childNodes, tagNames);
            if (tag) {
                tags = tags.concat(tag);
            }
        }
    }

    return tags;
}


function getAllPages (records) {
    let pages = [];
    
    for(let record of records) {
        if (record?.type !== 4 && !record?.data?.href) {
            continue;
        }

        const page = record.data.href?.replace(/\?.*|\#.*/gi, '');

        pages.push(page);
    }

    return pages;
}

function findNodeById(id, records, tagNames=[]) {
    for(let record of records) {
        if (record?.type !== 2) {
            continue;
        }

        // console.log(JSON.stringify(record, null, 4));
        if (record?.id == id && tagNames.includes(record.tagName?.toLowerCase())) {
            return record;
        } else if (record?.data?.node?.childNodes?.length) {
            return findNodeById(id, record.data.node.childNodes, tagNames);
        } else if (record?.childNodes?.length) {
            return findNodeById(id, record.childNodes, tagNames);
        }
    }
}

async function getAllDevices (sessions, db) {
    const rows = await db.collection('records_sessions').find({
        sessionId: {
            $in: sessions
        }
    }, {
        projection: {
            isMobile: 1,
            _id: 0
        }
    }).toArray();

    const statistics = {
        phone: 0,
        desktop: 0
    };

    for(let {isMobile} of rows) {
        if (isMobile) {
            statistics.phone++;
        } else {
            statistics.desktop++;
        }
    }

    return statistics
}

async function getAllCountries (sessions, db) {
    const rows = await db.collection('records_sessions').find({
        sessionId: {
            $in: sessions
        }
    }, {
        projection: {
            ip: 1,
            _id: 0
        }
    }).toArray();

    const countries = [];

    for(let {ip} of rows) {
        countries.push(await getGeolocationByIp(ip));
    }

    return countries;
}

async function getStatisticsFromRecords (type, sessionId, db) {
    const rows = await db.collection('records').find({
        sessionId
    }, {
        projection: {
            records: 1,
            _id: 0
        }
    }).toArray();


    let collectedRecords = [];

    for(let {records} of rows) {
        if (!records?.length) {
            continue;
        }

        collectedRecords = collectedRecords.concat(records);
    }
    
    if (type === 'buttonsAndLinks') {
        return getAllNodesByTagNames(collectedRecords, ['button', 'a']);
    } else if (type === 'pages') {
        return getAllPages(collectedRecords);
    }
}

export default async function handle (req, res) {
    res.setHeader(
        'Cache-Control', 
        'public, s-maxage=86400, stale-while-revalidate=86400'
    );
    
    try {
        const { accessToken } = req.cookies;
        const { _id: user_id } = jwt.verify(accessToken, JWT_SECRET);
        const db = getDatabase();
        const data = await db.collection("users_apps").findOne(
          {
            user_id,
          },
          {
            projection: {
              _id: 1,
              dao_name: 1,
            },
          }
        );
        const appid = data?._id?.toString?.();
    
        if (!appid) {
          throw "Was not found";
        }
    
        // total sessions and wallets
        const sessions = await db.collection('records_sessions').find({
            appid
        }).toArray();

        const sessionCount = new Set();
        const walletCount = new Set();

        for(let session of sessions) {
            sessionCount.add(session.sessionId);

            const wallets = Object.values(session.wallets);
            for(let wallet of wallets) {
                walletCount.add(wallet);
            }
        }

        // pages in snapshot
        const snapshots = await db.collection('snapshots').find({
            appid
        }).toArray();

        const snapshotPagesCount = new Set();
        for(let snapshot of snapshots) {
            snapshotPagesCount.add(snapshot.location);
        }

        const recordingsCount = await db.collection('records').find({
            sessionId: {
                $in: Array.from(sessionCount)
            }
        }).count();

        let buttonsAndLinks = {}
        let topPages = [];
        const topCountries = await getAllCountries(Array.from(sessionCount), db);
        let devices = await getAllDevices(Array.from(sessionCount), db);
        
        for(let session of Array.from(sessionCount)) {
            const statistics = await getStatisticsFromRecords('buttonsAndLinks', session, db);
            topPages = topPages.concat(await getStatisticsFromRecords('pages', session, db));

            for(let statistic of statistics) {
                if (!statistic?.childNodes?.length) {
                    continue;
                }

                for(let node of statistic.childNodes) {
                    if (node?.type === 3 && node?.textContent) {
                        if (buttonsAndLinks[node?.id]) {
                            buttonsAndLinks[node.id].count++;
                        } else {
                            buttonsAndLinks[node.id] = {
                                text: node.textContent,
                                count: 1
                            }
                        }
                    }
                }
            }
        }

        buttonsAndLinks = Object.values(buttonsAndLinks).sort((a: any, b: any) => b.count - a.count).slice(0, 10);
        let topPagesStatistics: any = {}
        for(let page of topPages) {
            if (topPagesStatistics[page]) {
                topPagesStatistics[page]++;
            } else {
                topPagesStatistics[page] = 1;
            }
        }
        topPagesStatistics = Object.entries(topPagesStatistics).sort((a: any, b: any) => b[1] - a[1]).map(item => ({
            page: item[0],
            count: item[1]
        }))

        res.json({
            counts: [
                {
                    title: "Total Sessions",
                    count: sessionCount.size,
                },
                {
                    title: "Total connected wallets",
                    count: walletCount.size,
                },
                {
                    title: "Pages view in heatmap",
                    count: snapshotPagesCount.size
                },
                {
                    title: "Visitor recordings",
                    count: recordingsCount
                }
            ],
            buttonsAndLinks,
            topPages: topPagesStatistics,
            devices
        });


      } catch (err) {
        res.status(404).json({});
      }
}