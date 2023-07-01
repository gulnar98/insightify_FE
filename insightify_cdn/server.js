const express = require('express');
const fs = require('fs');
const path = require('path');
const getDatabase = require('./lib/mongodb');
const { ObjectId } = require('mongodb');

require('dotenv').config({
    path: process.env.NODE_ENV === 'production' ? '.env' : '.env.development'
});

const PORT = process.env.PORT || 3001;

const app = express();

// app.use(express.json());
// app.use(express.urlencoded({
//     extended: true
// }));

app.get('/v1/:appid/record.js', async (req, res) => {
    
    try {
        const { appid } = req.params;

        const db = getDatabase();
        const userapp = await db.collection('users_apps').findOne({
            _id: new ObjectId(appid)
        });

        if (!userapp) {
            return res.status(404).end();
        }
        

        const recorder_url = process.env.RECORDER_API_ENDPOINT;
        const snapshot_url = process.env.SNAPSHOT_API_ENDPOINT;
        const now = new Date();
        now.setDate(now.getDate() + 1);

        const fileContent = fs.readFileSync(path.join(__dirname, 'dist/main.js'));
        res.setHeader('content-type', 'text/javascript');
        res.setHeader('cache-control', 'max-age=86400, stale-while-revalidate=86400, private');
        res.setHeader('expires', now.toUTCString());
        res.setHeader('cache-status', 'OriginCache; hit; ttl=1100, "UserSnap"; fwd=uri-miss');
        res.end(`const USRC={appid:'${appid}',rurl:'${recorder_url}',surl:'${snapshot_url}',rt:${process.env.RECORDER_SEND_TIMEOUT || 10000},st:${process.env.SNAPSHOT_SEND_TIMEOUT || 60000}};${fileContent}`);
    } catch (err) {
        res.status(500).json({
            message: 'Something is wrong with server. Try again later! Error: ' + err
        });
    }
});


app.listen(PORT, () => {
    console.log("Server has been started and listening port:", PORT)
})