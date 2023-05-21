import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeatmapList () {

    const [snapshots, setSnapshots] = useState([]);

    useEffect(() => {
        try {
            fetch('/api/snapshot/heatmap')
                .then(result => result.json())
                .then(({snapshots}) => {
                    setSnapshots(state => snapshots);
                });
        } catch (err) {

        }
    }, []);


    return (
        <ul>
            {snapshots?.map(({_id, appid, location, timestamp}, index) => (
                <li key={`heatmap-snapshots-${index}`} style={{display: 'flex', justifyContent: 'space-between', marginBottom: 20}}>
                    <div>
                        <Link href={`/heatmaps/location/${_id}`}>Snapshot for page {location}</Link>
                    </div>
                    <div>
                        {new Date(timestamp).toUTCString()}
                    </div>
                </li>
            ))}
        </ul>
    );
}