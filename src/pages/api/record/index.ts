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
            e: records, 
            r: jsReferer,
            u: jsUserAgent,
            l: lang,
            w: wallets,
            a: appid,
            s: sessionId,
            p: platform,
            m: isMobile
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
            const jsRefererURL = parseDomain(new URL(jsReferer).hostname);

            const urlArr = [
                refererURL.hostname,
                jsRefererURL.hostname
            ];

            const isAllEqual = val => val?.toString?.()?.toLowerCase?.() === appURLParsed.hostname?.toString?.().toLowerCase?.();
        
            if (!urlArr.every(isAllEqual)) {
                return res.json({});
            }
        } catch (err) {
            return res.json({});
        }

        const result = await db.collection('records_sessions').findOne({
            sessionId
        }, {
            projection: {
                _id: 1
            }
        });

        if (!result) {
            await db.collection('records_sessions').insertOne({
                jsReferer,
                jsUserAgent,
                lang,
                wallets,
                appid,
                userAgent,
                referer,
                sessionId,
                platform,
                isMobile
            });
        }

        await db.collection('records').insertOne({
            sessionId,
            records,
            page: jsReferer
        });

    } catch (err) {}

    res.json({});
}