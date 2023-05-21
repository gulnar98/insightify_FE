import * as React from 'react';
import style from './assets/css/style.module.css'
import Checkbox from '@mui/joy/Checkbox';
import playBtn from './assets/images/playBtn.png';
import avatar from './assets/images/avatar.png'
import wallet from './assets/images/wallet.png'
import browser from './assets/images/browser.png'
import os from './assets/images/os.png'
import estonia from "./assets/images/estonia.png"
import coinbase from './assets/images/coinbase.png'
import other from './assets/images/other.png'
import Avatar from '../avatar';
import { useState } from 'react';
import ListViewDelete from '../list-view-delete';
import deletee from './assets/images/deletee.png'
import Button from '../../UI/button/Button';
import DeletePopUp from '../DeletePopup';

export default function RecordingsInformation(
    {   labelBtn, 
        topAssetsMirror, 
        topAssetsEns, 
        topAssetsApe, 
        walletImage, 
        walletAge, 
        totalAssets,
        dateProps,
        countryProps,
        actionProps,
        pagesProps,
        durationProps,
        landingPage,
        exitPage,
        checbox
    }) {

    const buttonProps = {
        btncolor: "white",
        text: "Delete",
        border: "solid 1px #9A3530",
        textColor: "#9A3530",
        borderRadius: "4px",
        padding: "7px 15px",
        fontSize: "1em",
        fontWeight: "700",
        imgprops: deletee
    };
        
    const buttonCancel = {
        border: "none",
        btncolor: "#ffff",
        textColor:"black",
        padding: "12px 17px",
        text: "Cancel",
        fontFamily: "Inter",
        fontSize: '14px',
        fontWeight: '600'
    }
    const [inputButton, setInputButton] = useState(false)
    const [showPopUp, setShowPopUp] = useState(false)

    return (
        <>
            <div className={style.container}>
                <div className={style.children}>
                    <div className={style.inputClick}>
                        <Checkbox onClick={() => {setInputButton(!inputButton)}}/>
                        <button className={style.playBtn}>
                            <img src={playBtn.src}/>&nbsp;
                            Play
                        </button>
                    </div>
                    <div className={style.avatar}>
                        <Avatar
                            imgProps={""}
                            nameProps={"Ali"}
                            surnameProps={"Sadygov"}/>
                    </div>
                    <div className={style.userID}>
                        <p className={style.nameID}>tural.eth</p>
                        <p className={style.codeID}>0x312d..54e3</p>
                    </div>
                    <div className={style.label}>
                        {labelBtn}
                    </div>
                    <div className={style.topAssets}>
                        {topAssetsMirror}
                        {topAssetsEns}
                        {topAssetsApe}
                        {
                            inputButton ? (
                                <ListViewDelete
                                btn={
                                    <Button
                                    {...buttonProps}
                                    onClick={() => {
                                        setShowPopUp(true);
                                        setInputButton(!inputButton);
                                    }}
                                    />
                                }
                                />
                            ) : (
                                <></>
                            )
                        }

                        {
                        showPopUp ? (
                            <DeletePopUp buttonCancel={<Button {...buttonCancel} />} />
                        ) : (
                            <></>
                        )
                        }
                    </div>
                    <div className={style.wallet}>
                        <img src={wallet.src}/>
                    </div>
                    <div className={style.walletAge}>
                        {walletAge}
                    </div>
                    <div className={style.totalAssets}>
                        {totalAssets}
                    </div>
                    <div className={style.sourceOfFunds}>
                        <div>
                            <div className={style.foundsOne}>
                                <img src={coinbase.src}/>
                                <p>Coinbase</p>
                                <p>60%</p>
                            </div>
                            <div className={style.foundsTwo}>
                                <img src={other.src}/>
                                <p>Other</p>
                                <p>40%</p>
                            </div>
                        </div>
                    </div>
                    <div className={style.date}>
                        {dateProps}
                    </div>
                    <div className={style.country}>
                        <img src={estonia.src}/>&nbsp;
                        {countryProps}
                    </div>
                    <div className={style.action}>
                        {actionProps}
                    </div>
                    <div className={style.pages}>
                        {pagesProps}
                    </div>
                    <div className={style.duration}>
                        {durationProps}
                    </div>
                    <div className={style.browser}>
                        <img src={browser.src}/>
                    </div>
                    <div className={style.os}>
                        <img src={os.src}/>
                    </div>
                    <div className={style.landingPage}>
                        {landingPage}
                    </div>
                    <div className={style.exitPage}>
                        {exitPage}
                    </div>
                </div>
            </div>
        </>
    )
}