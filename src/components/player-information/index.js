import { useEffect } from "react";
import Image from "next/image";
import style from "./assets/css/style.module.css";
import Avatar from "../avatar";
import { useState } from "react";
import Button from "../../UI/button/Button";
import DeletePopUp from "../DeletePopup";
import coin from './assets/images/coin.png'
import flag from './assets/images/flag.png'
import mac from './assets/images/mac.png'
import wallet from './assets/images/wallet.png'
import browser from './assets/images/browser.png'
import icon from './assets/images/icon.png'
import exit from './assets/images/Vector.svg'
import arrow from './assets/images/arrow.svg'

import chrome from "@/assets/images/browsers/chrome.png";
import firefox from "@/assets/images/browsers/firefox.png";
import msie from "@/assets/images/browsers/msie.png";
import opera from "@/assets/images/browsers/opera.png";
import safari from "@/assets/images/browsers/safari.png";
import unknown from "@/assets/images/browsers/unknown.png";

import windows from "@/components/recordingsInformation/assets/images/windows.png";
import macos from "@/components/recordingsInformation/assets/images/macos.png";

import { detectBrowserByUserAgent } from "@/lib/utils";
import Link from "next/link";


const buttonProps = {
  btncolor: "#1F75CC",
  btncolorHover: "#1F75CC",
  text: "NFT Whale",
  textColorHover: "white",
  border: "solid 1px #1F75CC",
  textColor: "white",
  borderRadius: "5px",
  padding: "7px 15px",
  fontSize: "1em"
};

const topProps = {
  text: "coinbase.io",
  textColorHover: "white",
  border: "solid 1px #707070",
  textColor: "white",
  borderRadius: "5px",
  padding: "7px 11px",
  fontSize: "1em"
};

const browserList = {
  chrome,
  firefox,
  msie,
  opera,
  safari,
  unknown,
};

const osList = {
  macos,
  windows,
};


export default function PlayerInformation({
  labelBtn,
  platform,
  dateProps,
  actionProps,
  pagesProps,
  durationProps,
  landingPage,
  exitPage,
  listviewprops,
  deletePopUp,
  userAgent,
  countryName,
  countryFlag,
  web3
}) {

  return (
    <tr>
        <td>
          <Link href={"/recording/"}><img src={exit.src}/></Link>
          {/* <img src={arrow.src}/> */}
        </td>
        <td>
          <Avatar imgProps={""} nameProps={"Ali"} surnameProps={"Sadygov"} />
        </td>
        <td>
          <p className={style.nameID}>{web3?.ens}</p>
          <p className={style.codeID}>{web3?.address?.slice?.(0, 6)}...{web3?.address?.slice?.(-4)}</p>
        </td>
        <td>{<Button {...buttonProps}/>}</td>
        <td>
          {web3?.topAssets && Object.values(web3?.topAssets)?.map?.(asset => <Button key={`topasset-${asset?.name}`} {...topProps} text={asset?.name} />)}
        </td>
        <td>
          <Image src={wallet.src} width={35} height={35} />
        </td>
        <td>{web3?.age}</td>
        <td>
          {web3?.balance}
        </td>
        {/* <td>
          <div>
            <div className={style.foundsOne}>
              <img src={coin.src} />
              <p>Coinbase</p>
              <p>60%</p>
            </div>
            <div className={style.foundsTwo}>
              <img src={icon.src} />
              <p>Other</p>
              <p>40%</p>
            </div>
          </div>
        </td> */}
        <td>{dateProps}</td>
        <td>
          {countryFlag && <Image src={countryFlag} width={30} height={30} />}
          <p>{countryName}</p>
        </td>
        <td>{actionProps}</td>
        <td>{pagesProps}</td>
        <td>{durationProps}</td>
        <td>
          <Image src={browserList[detectBrowserByUserAgent(userAgent)]?.src} width={30} height={30} />
        </td>
        <td>
          <Image src={osList[platform?.toLowerCase?.()]?.src} width={30} height={30} />
        </td>
        <td>{landingPage}</td>
        <td>{exitPage}</td>
    </tr>
  );
}