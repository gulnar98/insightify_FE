import { getDatabase } from "@/lib/mongodb";
import jwt from "jsonwebtoken";

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
            throw 'Was not found';
        }

        const sessions = await db.collection('records_sessions').find({
            appid
        }, {
            projection: {
                jsUserAgent: 0,
            }
        }).toArray();

        if (!sessions?.length) {
            return res.status(404).end('');
        }

        res.json({
            sessions
        });
    } catch (err) {
        res.status(404).json({});
    }
}