import { getDatabase } from "@/lib/mongodb";
import { getGeolocationByIp, getNormalizedTime, getWeb3Data } from "@/lib/utils";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";


export default async function handler (req, res) {
    try {
        const { accessToken } = req.cookies;
        const { _id: user_id } = jwt.verify(accessToken, JWT_SECRET);
        const {sessionId} = req.query;

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
            throw 'Was not found';
        }

        const app = await db.collection('records_sessions').findOne({
            sessionId
        }, {
            projection: {
                jsUserAgent: 0,
                jsReferer: 0,
                referer: 0
            }
        });

        if (!app) {
            return res.status(404).end('');
        }

        let web3data = app.web3data || {};

        if (
            Object.keys(app.wallets).length && 
            (!app.web3data || (Date.now() - app.web3dataUpdated) > 86400000)
        ) {
            web3data = await getWeb3Data(app.wallets);
            try {
                await db.collection('records_sessions').updateOne({
                    _id: app._id
                }, {
                    $set: {
                        web3data,
                        web3dataUpdated: Date.now()
                    }
                })
            } catch {};
        }

        const records = await db.collection('records').find({
            sessionId
        }, {
            projection: {
                records: 1,
                _id: 0
            }
        }).toArray();

        const enterPage = await db.collection('records').find({
            sessionId
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
            sessionId
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
            sessionId,
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
            sessionId,
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

        if (!app.ipgeolocation && app.ip) {
            const ipgeolocation = await getGeolocationByIp(app.ip);
            if (ipgeolocation?.country?.code) {
                app.countryCode = ipgeolocation.country.code;
                app.countryName = ipgeolocation?.country?.name;
                app.countryFlag = ipgeolocation?.country?.flag?.file;

                try {
                    await db.collection('records_sessions').updateOne({
                        _id: app._id
                    }, {
                        ipgeolocation
                    });
                } catch {}
            }
        } else if (app?.ipgeolocation?.country?.code) {
            app.countryCode = app?.ipgeolocation?.country?.code;
            app.countryFlag = app?.ipgeolocation?.country?.flag?.file;
            app.countryName = app?.ipgeolocation?.country?.name;
        }

        app.pagesCount = Array.from(pagesCount).length;
        app.actionsCount = actionsCount;
        app.enterPage = enterPage?.[0]?.page;
        app.exitPage = exitPage?.[0]?.page;
        app.duration = getNormalizedTime(exitPage?.[0]?.timestamp - enterPage?.[0]?.timestamp);

        res.json({
            records: [].concat(...records.map(({records}) => records)),
            web3data,
            ...app
        });
    } catch (err) {
        res.status(404).json({});
    }
}