import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import h337 from 'heatmap.js';
import { getDatabase } from "@/lib/mongodb";


export default function HeatmapLocation ({
    _id
}) {

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

            <h1>{_id}</h1>
        </>
    );
}

export const getServerSideProps = async ({params}) => {
    const {
        _id
    } = params;

    return {
        props: {
            _id
        }
    }
}