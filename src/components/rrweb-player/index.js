import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';
import style from './assets/css/style.module.css'
import video from './assets/images/led.jpg';
import { useEffect, useRef } from 'react';

export default function RRWebPlayer({events, width=700, height=500, autoPlay=false}) {

    const playerContainerRef = useRef();

    useEffect(() => {
        if (!playerContainerRef.current) {
            return;
        }

        playerContainerRef.current.innerHTML = '';
        new rrwebPlayer({
            target: playerContainerRef.current,
            props: {
                events,
                width,
                height,
                autoPlay
            }
        });
    }, [playerContainerRef]);

    return (
        <>
            <div className={style.main} ref={playerContainerRef} style={{padding: 0}}></div>
        </>
    )
}