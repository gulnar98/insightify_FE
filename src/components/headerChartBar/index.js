import React from 'react';
import styles from "./asset/css/style.module.css";
import chart from "./asset/images/chart.svg";
import hash from "./asset/images/hash.svg";

//Bu boyuk divlerin top pages, top clicked button and links olan hisselerin header hissesidi.

function HeaderChartBar (props) {
    const { text, children } = props;
    const displayText = text || 'Top clicked buttons & links';

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.text}>{displayText}</div>
                 
                <div className={styles.icon}>
                    {children}
                    <img src={hash.src} alt="icon"/>
                    <img src={chart.src} alt="icon2"/>
                </div>
               
            </div>
        </>
    )
}

export default HeaderChartBar;





