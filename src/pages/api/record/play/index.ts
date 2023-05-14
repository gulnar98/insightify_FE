import { getDatabase } from "@/lib/mongodb";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";


export default async function handler (req, res) {
    try {
        const { accessToken } = req.cookies;
        const { _id: user_id } = jwt.verify(accessToken, JWT_SECRET);
        const {sessid: sessionId} = req.query;

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
                _id: 1
            }
        });

        if (!app) {
            return res.status(404).end('');
        }

        const records = await db.collection('records').find({
            sessionId
        }, {
            projection: {
                records: 1,
                _id: 0
            }
        }).toArray();

        res.json([].concat(...records.map(({records}) => records)));
    } catch (err) {
        res.status(404).json({});
    }
}