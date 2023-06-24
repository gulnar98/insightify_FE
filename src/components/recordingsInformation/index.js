import { useEffect } from "react";
import Image from "next/image";
import style from "./assets/css/style.module.css";
import playBtn from "./assets/images/playBtn.png";
import wallet from "./assets/images/wallet.png";
import windows from "./assets/images/windows.png";
import macos from "./assets/images/macos.png";
import coinbase from "./assets/images/coinbase.png";
import other from "./assets/images/other.png";
import Avatar from "../avatar";
import { useState } from "react";
import ListViewDelete from "../list-view-delete";
import Button from "../../UI/button/Button";
import DeletePopUp from "../DeletePopup";
import chrome from "@/assets/images/browsers/chrome.png";
import firefox from "@/assets/images/browsers/firefox.png";
import msie from "@/assets/images/browsers/msie.png";
import opera from "@/assets/images/browsers/opera.png";
import safari from "@/assets/images/browsers/safari.png";
import unknown from "@/assets/images/browsers/unknown.png";
import { detectBrowserByUserAgent } from "@/lib/utils";
import Link from "next/link";
import Check from "@/UI/checkbox";
import { Checkbox } from "@mui/material";

const osList = {
  macos,
  windows,
};

const browserList = {
  chrome,
  firefox,
  msie,
  opera,
  safari,
  unknown,
};

export default function RecordingsInformation({
  web3,
  sessionId,
  labelBtn,
  walletImage,
  platform,
  dateProps,
  countryProps,
  actionProps,
  pagesProps,
  durationProps,
  landingPage,
  exitPage,
  checked,
  onChange=()=>{},
  listviewprops,
  deletePopUp,
  userAgent
}) {

    const [web3ens, setWeb3ens] = useState('');
    const [web3address, setWeb3address] = useState('');
    const [web3age, setWeb3age] = useState('');
    const [web3balance, setWeb3balance] = useState('');
    const [web3topAssets, setWeb3TopAssets] = useState([]);


    useEffect(() => {
        if (web3) {
            const topAssets = [];
            for (let [wallet, info] of Object.entries(web3)) {
                setWeb3ens(state => info?.ens?.[0]);
                setWeb3address(state => info?.address);
                setWeb3age(state => info?.age);
                setWeb3balance(state => info?.balance);

                for(let asset of Object.values(info?.topAssets)) {
                    topAssets.push({
                        btncolor: "rgb(255, 255, 255)",
                        btncolorHover: "rgb(255, 255, 255)",
                        text: asset?.name,
                        quantity: asset?.quantity,
                        description: asset?.description,
                        url: asset?.url,
                        textColorHover: "#707070",
                        border: "solid 1px #707070",
                        textColor: "#707070",
                        borderRadius: "5px",
                        padding: "7px 10px",
                        fontSize: "1em"
                    });
                }
            }

            setWeb3TopAssets(state => topAssets);
        }
    }, [web3]);



  return (
    <>
      <tr>
        {/* <div className={style.children}> */}
          <td>
            <div>
              <Check bool={checked} onChange={onChange} />
            </div>
            
            <div>
              <Link
                href={{
                  pathname: `/recording/${sessionId}/play`
                }}
                className={style.playBtn}
              >
                <div>
                  <Image src={playBtn.src} width={16} height={14} />
                </div>
                <div>
                  Play
                </div>
              </Link>
            </div>
          </td>
          <td>
            <Avatar imgProps={""} nameProps={"Ali"} surnameProps={"Sadygov"} />
          </td>
          <td>
            <p className={style.nameID}>{web3ens}</p>
            <p className={style.codeID}>{web3address?.slice(0, 6)}...{web3address?.slice(-4)}</p>
          </td>
          <td>{labelBtn}</td>
          <td>
            {web3topAssets?.map((asset, index) => (
                <Button key={`top-asset-${index}`} {...asset} title={asset?.description} onClick={() => window.location.replace(asset?.url)} />
            ))}
            {listviewprops}
            {deletePopUp}
          </td>
          <td>
            <img src={wallet.src} />
          </td>
          <td>{web3age}</td>
          <td>{web3balance ? web3balance + ' ETH' : ''}</td>
          {/* <td>
            <div>
              <div className={style.foundsOne}>
                <img src={coinbase.src} />
                <p>Coinbase</p>
                <p>60%</p>
              </div>
              <div className={style.foundsTwo}>
                <img src={other.src} />
                <p>Other</p>
                <p>40%</p>
              </div>
            </div>
          </td> */}
          <td>{dateProps}</td>
          <td>
            {countryProps?.flag && (
              <Image src={countryProps?.flag} width={30} height={20} />
            )}
            &nbsp;
            {countryProps?.name}
          </td>
          <td>{actionProps}</td>
          <td>{pagesProps}</td>
          <td>{durationProps}</td>
          <td>
            <img src={browserList[detectBrowserByUserAgent(userAgent)]?.src} />
          </td>
          <td>
            <img src={osList[platform?.toLowerCase?.()]?.src || macos.src} />
          </td>
          <td>{landingPage}</td>
          <td>{exitPage}</td>
      </tr>
    </>
  );
}