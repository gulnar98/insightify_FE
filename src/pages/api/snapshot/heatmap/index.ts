import { getDatabase } from "@/lib/mongodb";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

export default async function handle (req, res) {
    try {
        const { accessToken } = req.cookies;
        const { _id: user_id } = jwt.verify(accessToken, JWT_SECRET);

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

        const snapshots = await db.collection('snapshots').find({
            appid: appid.toString(),
        }, {
            projection: {
                snapshot: 0,
                appid: 0
            }
        }).toArray();

        res.json({
            snapshots
        });

    } catch (err) {
        res.status(401).json({});
    }
}