import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import h337 from 'heatmap.js';
import { getDatabase } from "@/lib/mongodb";
import { useRouter } from "next/router";
import Link from "next/link";


export default function HeatmapLocation () {

    const [sessions, setSessions] = useState([]);
    const {query} = useRouter();
    const {_id} = query;

    useEffect(() => {
        fetch(`/api/snapshot/heatmap/location/${_id}`)
            .then(result => result.json())
            .then(({sessions}) => setSessions(state => sessions))
            .catch(err => {});
    }, [_id]);

    const header = (
        <Head>
            <meta charSet="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Heatmap</title>
        </Head>
    );

    return (
        <>
            {header}

            <ul>
                {sessions?.map((session, index) => (
                    <li style={{marginBottom: 20}} key={`heatmap-location-${index}`}>
                        Session: <Link href={`/heatmaps/${_id}/${session}`}>{session}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}