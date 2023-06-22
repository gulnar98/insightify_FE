import { getDatabase } from "@/lib/mongodb";
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

        const sessions = await db.collection('records_sessions').find({
            appid
        }, {
            projection: {
                jsUserAgent: 0,
            }
        }).toArray();
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