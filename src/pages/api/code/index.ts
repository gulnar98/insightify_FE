import jwt from "jsonwebtoken";
import { getDatabase } from "../../../lib/mongodb";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";
const CDN_URL = process.env.CDN_URL || "http://localhost:3001";


export default async function handler (req, res) {
    
    try {
        const { accessToken } = req.cookies;
        const { _id: user_id } = jwt.verify(accessToken, JWT_SECRET);
        const db = getDatabase();
        const data = await db.collection('users_apps').findOne({
            user_id
        }, {
            projection: {
                _id: 1
            }
        });

        const appId = data?._id?.toString?.();

        if (!appId) {
            throw 'Was not found';
        }

        res.setHeader('Content-Type', 'text/plain')
        res.end(`<script src="${CDN_URL}/${appId}/record.js"></script>`);
    } catch (err) {
        res.status(404).end('');
    }
}