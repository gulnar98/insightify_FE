import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import h337 from 'heatmap.js';
import { useRouter } from "next/router";


export default function HeatmapSession () {

    const divRef = useRef();
    const router = useRouter();

    const [snapshot, setSnapshot] = useState();
    const [records, setRecords] = useState([]);
    const [error, setError] = useState('');

    const {snapshotId, sessionId} = router.query;

    useEffect(() => {
        if (!snapshotId || !sessionId) {
            return;
        }
        
        fetch(`/api/snapshot/heatmap/${snapshotId}/${sessionId}`)
            .then(result => result.json())
            .then(({
                records,
                snapshot
            }) => {
                if (!snapshot || !records?.length) {
                    return setError(state => 'Something went wrong. Reload page and try again!');
                }
                setSnapshot(state => snapshot.snapshot);
                setRecords(state => records);
            }).catch(err => {

            });
    }, [snapshotId, sessionId]);

    useEffect(() => {
        if (!divRef?.current) {
            return;
        }

        const heatmap = h337.create({
            container: divRef.current
        });

        setTimeout(() => {
            heatmap.setData({
                max: 5,
                data: records
            });
        }, 1000);

    }, [divRef?.current, records]);

    const header = (
        <Head>
            <meta charSet="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Heatmap</title>
        </Head>
    );

    if (error) {
        return (
            <>
                {header}

                <h1>{error}</h1>
            </>
        );
    }

    if (!snapshot || !records?.length) {
        return (
            <>
                {header}

                <h1>Loading...</h1>
            </>
        );
    }

    return (
        <>
            {header}

            <div ref={divRef} style={{
                // width: 760,
                // height: '100vh',
                margin: '0 auto'
            }}>
                <img src={snapshot} style={{width: '100%', maxWidth: '100%'}} />
            </div>
        </>
    );
}