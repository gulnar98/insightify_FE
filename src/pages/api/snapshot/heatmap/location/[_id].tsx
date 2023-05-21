import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";


export default async function handle (req, res) {
    try {
        const { accessToken } = req.cookies;
        const { _id: user_id } = jwt.verify(accessToken, JWT_SECRET);
        const {_id: snapshotId} = req.query;

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

        const {location} = await db.collection('snapshots').findOne({
            _id: new ObjectId(snapshotId),
            appid: appid.toString()
        }, {
            projection: {
                location: 1,
                _id: 0
            }
        });

        const records = await db.collection('records').find({
            "records.data.type": {
                $in: [1,2]
            },
            "records.type": 3,
            page: location
        }, {
            projection: {
                sessionId: 1,
                _id: 0
            }
        })
        .toArray();

        const sessions = new Set();

        for(let {sessionId} of records) {
            sessions.add(sessionId);
        }

        res.json({
            sessions: Array.from(sessions)
        })
        
        

        // res.json({
        //     snapshot
        // });
    } catch (err) {
        res.json({});
    }
}