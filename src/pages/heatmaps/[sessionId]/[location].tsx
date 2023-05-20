import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import h337 from 'heatmap.js';


export default function HeatmapSession ({
    location,
    sessionId
}) {

    const divRef = useRef();

    const [snapshot, setSnapshot] = useState();
    const [records, setRecords] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`/api/snapshot/heatmap/${sessionId}?l=${location}`)
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
    }, []);

    useEffect(() => {
        if (!divRef?.current) {
            return;
        }

        const heatmap = h337.create({
            container: divRef.current
        });

        heatmap.setData({
            max: 5,
            data: records
        });

    }, [divRef?.current]);

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
                width: 760,
                height: '100vh',
                margin: '0 auto'
            }}>
                <img src={snapshot} style={{width: '100%', maxWidth: '100%'}} />
            </div>
        </>
    );
}

export const getServerSideProps = async ({params}) => {
    const {
        sessionId,
        location
    } = params;

    return {
        props: {
            sessionId,
            location: Buffer.from(location, 'base64').toString('utf-8')
        }
    }
}