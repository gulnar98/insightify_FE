import jwt from "jsonwebtoken";
import { getDatabase } from "../../../../lib/mongodb";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

export default async function handler(req, res) {
    try {
      const { accessToken } = req.cookies;
      const { _id: user_id } = jwt.verify(accessToken, JWT_SECRET);
      const db = getDatabase();

      const {
        url,
        verified,
        _id
      } = await db.collection('users_apps').findOne({
        user_id
      }, {
        projection: {
          url: 1,
          verified: 1,
          _id: 1
        }
      });

      if (verified) {
        return res.json({
          verified: true
        });
      }

      const result = await (await fetch(url)).text();

      if (result.indexOf(`data-appid="${_id.toString()}"`) !== -1) {
        await db.collection('users_apps').updateOne({
          _id
        }, {
          $set: {
            verified: true
          }
        });

        res.json({
          verified: true
        });
      } else {
        res.status(404).json({
          verified: false
        });
      }
    } catch (err) {
      res.status(400).json({
        verified: false
      });
    }
}