import * as React from 'react';
import style from './assets/css/style.module.css'

export default function RecordingsHeader({checkbox, chec}) {

    return (
        <tr className={style.container}>
            {/* <div className={style.children}> */}
            {
                chec ? <th className={style.rrweb}></th> : <th className={style.inputClick}>{checkbox}</th>
            }
            <th>Avatar</th>
            <th>User ID</th>
            <th>Label</th>
            <th>Top 5 Assets</th>
            <th>Wallet</th>
            <th>Wallet Age</th>
            <th>Total Assets</th>
            {/* <th>Source of funds</th> */}
            <th>Date</th>
            <th>Country</th>
            <th>Action #</th>
            <th>Pages #</th>
            <th>Duration</th>
            <th>Browser</th>
            <th>OS</th>
            <th>Landing Page</th>
            <th>Exit Page</th>
            {/* </div> */}
        </tr>
    )
}