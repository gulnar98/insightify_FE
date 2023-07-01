import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import {parseDomain, ParseResultType} from 'parse-domain';

export default async function handle (req, res) {
    try {
        const userAgent = req.headers['user-agent'];
        const referer = req.headers['referer'];

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Max-Age', '31536000'); // 1 year

        if (req.method !== 'POST') {
            return res.json({});
        }

        const {
            r: location,
            a: appid,
            d: data
        } = req.body;

        const db = getDatabase();
        const {url: appURL} = await db.collection('users_apps').findOne({
            _id: new ObjectId(appid),
            verified: true
        }, {
            projection: {
                url: 1,
                _id: 0
            }
        });

        try {
        
            const appURLParsed = parseDomain(new URL(appURL).hostname);
            const refererURL = parseDomain(new URL(referer).hostname);

            if (appURLParsed.hostname?.toString?.().toLowerCase?.() != refererURL?.hostname?.toString?.().toLowerCase?.()) {
                return res.json({});
            }
        } catch (err) {
            return res.json({});
        }

        await db.collection('snapshots').updateOne({
            appid,
            location
        }, {
            $set: {
                snapshot: data,
                timestamp: Date.now()
            }
        }, {
            upsert: true
        });

        

    } catch (err) {}

    res.json({});
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '200mb' // Set desired value here
        }
    }
}