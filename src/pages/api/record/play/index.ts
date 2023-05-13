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

        const records = await db.collection('records').find({
            appid
        }, {
            limit: 1000,
            projection: {
                _id: 0
            }
        }).toArray();

        res.json({
            records
        });
    } catch (err) {
        res.status(404).end('');
    }
}