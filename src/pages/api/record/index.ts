import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export default async function handle (req, res) {
    try {
        const userAgent = req.headers['user-agent'];
        const referer = req.headers['referer'];
        const {
            e: records, 
            r: jsReferer,
            u: jsUserAgent,
            l: lang,
            w: wallets,
            a: appid
        } = req.body;

        const db = getDatabase();
        await db.collection('records').insertOne({
            records,
            jsReferer,
            jsUserAgent,
            lang,
            wallets,
            appid,
            userAgent,
            referer
        });

    } catch (err) {}

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({});
}