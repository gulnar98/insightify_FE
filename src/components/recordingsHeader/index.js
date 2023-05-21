import * as React from 'react';
import style from './assets/css/style.module.css'
import Checkbox from '@mui/joy/Checkbox';
import { useState } from 'react';

export default function RecordingsHeader() {

    const [inputbutton, setInputbutton] = useState(true)
    console.log("AAA",inputbutton)

    return (
        <>
            <div className={style.container}>
                <div className={style.children}>
                    <div className={style.inputClick} onClick={() => {setInputbutton(!inputbutton)}}>
                        <Checkbox/>
                    </div>
                    <div className={style.avatar}>Avatar</div>
                    <div className={style.userID}>User ID</div>
                    <div className={style.label}>Label</div>
                    <div className={style.topAssets}>Top 5 Assets</div>
                    <div className={style.wallet}>Wallet</div>
                    <div className={style.walletAge}>Wallet Age</div>
                    <div className={style.totalAssets}>Total Assets</div>
                    <div className={style.sourceOfFunds}>Source of funds</div>
                    <div className={style.date}>Date</div>
                    <div className={style.country}>Country</div>
                    <div className={style.action}>Action #</div>
                    <div className={style.pages}>Pages #</div>
                    <div className={style.duration}>Duration</div>
                    <div className={style.browser}>Browser</div>
                    <div className={style.os}>OS</div>
                    <div className={style.landingPage}>Landing Page</div>
                    <div className={style.exitPage}>Exit Page</div>
                </div>
            </div>
        </>
    )
}