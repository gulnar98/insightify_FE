import { getDatabase } from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

export default async function handle (req, res) {
    try {
        const { accessToken } = req.cookies;
        const { _id: user_id } = jwt.verify(accessToken, JWT_SECRET);
        let {snapshotId, p: period=30} = req.query;

        const db = getDatabase();

        const {_id: appid} = await db.collection('users_apps').findOne({
            user_id,
            verified: true
        }, {
            projection: {
                _id: 1
            }
        });

        if (!appid) {
            return res.status(404).json({});
        }

        const snapshot = await db.collection('snapshots').findOne({
            appid: appid.toString(),
            _id: new ObjectId(snapshotId)
        }, {
            projection: {
                _id: 0,
                appid: 0
            }
        });

        period = parseInt(period);

        const recordsLimit = {
            "records.timestamp": undefined
        }

        if (!isNaN(period)) {
            const date = new Date();
            date.setDate(date.getDate() - parseInt(period));

            recordsLimit['records.timestamp'] = {
                $gte: (Date.now() - period * 24 * 60 * 60 * 1000)
            }
        }

        const records = await db.collection('records').find({
            "records.data.type": {
                $in: [1,2]
            },
            "records.type": 3,
            // sessionId,
            page: snapshot.location,
            ...recordsLimit
        }, {
            projection: {
                records: 1,
                _id: 0
            }
        })
        .toArray();
        
        const recordsResponse = [];
        
        for(let record of records) {
            recordsResponse.push(
                ...record?.records
                    .filter(record => record?.data?.type == 2)
                    .map(record => ({
                        x: record?.data?.x,
                        y: record?.data?.y
                    }))
            );
        }

        res.json({
            snapshot,
            records: recordsResponse
        });

        // const app = await db.collection('snapshots').findOne({
            
        // });
    } catch (err) {
        res.status(401).json({});
    }
}