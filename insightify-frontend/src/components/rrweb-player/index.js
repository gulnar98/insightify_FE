import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';
import style from './assets/css/style.module.css'
import video from './assets/images/led.jpg';
import { useEffect, useRef, useState } from 'react';
import RecordingsHeader from '../recordingsHeader';
import RecordingsInformation from '../recordingsInformation';
import { useRouter } from 'next/router'
import Button from '@/UI/button/Button';
import PlayerInformation from '../player-information';

const buttonProps = {
    btncolor: "#1F75CC",
    btncolorHover: "#1F75CC",
    text: "NFT Whale",
    textColorHover: "white",
    border: "solid 1px #1F75CC",
    textColor: "white",
    borderRadius: "4px",
    padding: "7px 15px",
    fontSize: "1em"
  };

export default function RRWebPlayer({ events, width = 900, height = 450, autoPlay = false }) {
    const playerContainerRef = useRef();
    const router = useRouter();
    const [web3data, setWeb3data] = useState({});
    const data = router.query;

    useEffect(() => {
        if (!playerContainerRef.current) {
            return;
        }
        playerContainerRef.current.innerHTML = '';

        new rrwebPlayer({
            target: playerContainerRef.current,
            props: {
                events: events?.records || [],
                width,
                height,
                autoPlay
            }
        });
    }, [playerContainerRef]);

    useEffect(() => {
        const web3data = Object.values(events?.web3data)?.[0];
        if (!web3data) {
            return;
        }

        setWeb3data(web3data);
    }, [events?.web3data]);

    return (
        <>
            <div className={style.singlePlayerInfoBarWrapper}>
                <table className={style.singlePlayerInfoBar}>
                    <thead>
                        <RecordingsHeader chec={true} />
                    </thead>
                    <tbody>
                        <PlayerInformation
                            labelBtn={<Button {...buttonProps} />} 
                            web3={web3data}
                            dateProps={new Date(events.timestamp).toLocaleDateString('en-US', {
                                // weekday: 'long',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                                })}
                            actionProps={events?.actionsCount}
                            pagesProps={events?.pagesCount}
                            durationProps={events?.duration}
                            landingPage={events?.enterPage}
                            exitPage={events?.exitPage}
                            countryName={events?.countryName}
                            countryFlag={events?.countryFlag}
                            platform={events?.platform}
                            userAgent={events?.userAgent}
                        />
                    </tbody>
                </table>
            </div>
            <div className={style.main} ref={playerContainerRef} style={{ padding: 0 }}></div>
        </>
    )
}
