import { getDatabase } from "@/lib/mongodb";
import { getGeolocationByIp, getNormalizedTime, getWeb3Data } from "@/lib/utils";
import jwt from "jsonwebtoken";
import { CustomErrorForHttp } from "../../utils";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";


export default async function handler (req, res) {
    try {
        const { accessToken } = req.cookies;
        const { _id: user_id } = jwt.verify(accessToken, JWT_SECRET);

        const db = getDatabase();
        const user = await db.collection('users_apps').findOne({
            user_id
        }, {
            projection: {
                _id: 1
            }
        });

        const appid = user?._id?.toString?.();

        if (!appid) {
            throw new CustomErrorForHttp("appid Was not found",404);
        }

        const { p: period } = req.query;
        let periodTimestamp = new Date();

        if (period == 30) {
            periodTimestamp.setDate(periodTimestamp.getDate() - 30);
        } else if (period == 1) {
            periodTimestamp.setDate(periodTimestamp.getDate() - 1);
        } else if (period == 7) {
            periodTimestamp.setDate(periodTimestamp.getDate() - 7);
        } else if (period == 14) {
            periodTimestamp.setDate(periodTimestamp.getDate() - 14);
        } else {
            periodTimestamp.setDate(periodTimestamp.getDate() - 30);
        }

        const sessions = await db.collection('records_sessions').find({
            appid,
            timestamp: {
                $gte: periodTimestamp.getTime()
            }
        }, {
            projection: {
                jsUserAgent: 0,
                jsReferer: 0,
                referer: 0
            }
        }).toArray();

        for(let session of sessions) {
            let web3data = session.web3data || {};

            if (
                Object.keys(session.wallets).length && 
                (!session.web3data || (Date.now() - session.web3dataUpdated) > 86400000)
            ) {
                web3data = await getWeb3Data(session.wallets);
                try {
                    await db.collection('records_sessions').updateOne({
                        _id: session._id
                    }, {
                        $set: {
                            web3data,
                            web3dataUpdated: Date.now()
                        }
                    })
                } catch {};
            }

            const enterPage = await db.collection('records').find({
                sessionId: session.sessionId
            }, {
                projection: {
                    page: 1,
                    timestamp: 1,
                    _id: 0
                }
            }).sort({
                timestamp: 1
            }).limit(1).toArray();

            const exitPage = await db.collection('records').find({
                sessionId: session.sessionId
            }, {
                projection: {
                    page: 1,
                    timestamp: 1,
                    _id: 0
                }
            }).sort({
                timestamp: -1
            }).limit(1).toArray();


            const pages = await db.collection('records').find({
                sessionId: session.sessionId,
                "records.type": 4
            }, {
                projection: {
                    records: 1,
                    _id: 0
                }
            }).toArray();

            let pagesCount = new Set();
            for(let page of pages) {
                for(let record of page.records) {
                    if (record?.type == 4 && record?.data?.href) {
                        pagesCount.add(record.data.href);
                    }
                }
            }



            const actions = await db.collection('records').find({
                sessionId: session.sessionId,
                "records.data.type": {
                    $in: [1,2]
                },
                "records.type": 3
            }, {
                projection: {
                    records: 1,
                    _id: 0
                }
            }).toArray();

            let actionsCount = 0;
            for(let action of actions) {
                for(let record of action.records) {
                    if (record?.type == 3) {
                        actionsCount++;
                    }
                }
            }

            if (!session.ipgeolocation && session.ip) {
                const ipgeolocation = await getGeolocationByIp(session.ip);
                if (ipgeolocation?.country?.code) {
                    session.countryCode = ipgeolocation.country.code;
                    session.countryName = ipgeolocation?.country?.name;
                    session.countryFlag = ipgeolocation?.country?.flag?.file;

                    try {
                        await db.collection('records_sessions').updateOne({
                            _id: session._id
                        }, {
                            ipgeolocation
                        });
                    } catch {}
                }
            } else if (session?.ipgeolocation?.country?.code) {
                session.countryCode = session?.ipgeolocation?.country?.code;
                session.countryFlag = session?.ipgeolocation?.country?.flag?.file;
                session.countryName = session?.ipgeolocation?.country?.name;
            }

            session.pagesCount = Array.from(pagesCount).length;
            session.actionsCount = actionsCount;
            session.enterPage = enterPage?.[0]?.page;
            session.exitPage = exitPage?.[0]?.page;
            session.duration = getNormalizedTime(exitPage?.[0]?.timestamp - enterPage?.[0]?.timestamp);
            session.web3 = web3data;
        }

        if (!sessions?.length) {
            throw new CustomErrorForHttp("Session not found",404);
        }

        res.json({
            sessions
        });
    } catch (err) {
        res.status(404).json({});
    }
}