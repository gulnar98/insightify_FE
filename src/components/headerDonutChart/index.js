import React from 'react';
import styles from "./asset/css/style.module.css";
import piechart from "./asset/images/piechart.svg";
import percentange from './asset/images/percentage.svg'



function HeaderDonutChart (props) {
    const  text = props.text;
    const displayText = text || 'New vs Returing';

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.text}>{displayText}</div>
                 
                <div className={styles.icon}>
                
                    <img src={percentange.src} alt="icon"/>
                    <img src={piechart.src} alt="icon2"/>
                </div>
               
            </div>
        </>
    )
}

export default HeaderDonutChart;





