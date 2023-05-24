import style from './assets/css/style.module.css'
import RecordingAside from "../RecordingAside";
import RecordingsHeader from '../recordingsHeader';
import RecordingsInformation from '../recordingsInformation';
import Button from '../../UI/button/Button';
import LastDayAddFilter from '../lastDayAddFilter/lastDayAddFilterContainer';
import { Checkbox } from '@mui/material';
import { useState } from 'react';

export default function HandlerecordPage() {

    const [headerButton, setHeaderButton] = useState(false)
    const [infoButton, setInfoButton] = useState(false)

    console.log("AAA",headerButton)
    console.log("BBB",infoButton)

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
  
    const btnMirrorProps = {
        btncolor: "rgb(255, 255, 255)",
        btncolorHover: "rgb(255, 255, 255)",
        text: "MIRROR",
        textColorHover: "#707070",
        border: "solid 1px #707070",
        textColor: "#707070",
        borderRadius: "5px",
        padding: "7px 10px",
        fontSize: "1em"
    }
  
    const btnEnsProps = {
        btncolor: "rgb(255, 255, 255)",
        btncolorHover: "rgb(255, 255, 255)",
        text: "ENS",
        textColorHover: "#707070",
        border: "solid 1px #707070",
        textColor: "#707070",
        borderRadius: "5px",
        padding: "7px 10px",
        fontSize: "1em"
    }
  
    const btnApeProps = {
        btncolor: "rgb(255, 255, 255)",
        btncolorHover: "rgb(255, 255, 255)",
        text: "APE",
        textColorHover: "#707070",
        border: "solid 1px #707070",
        textColor: "#707070",
        borderRadius: "5px",
        padding: "7px 10px",
        fontSize: "1em"
    }

    return (
        <>
            <div className={style.container}>
                <div className={style.leftDiv}>
                    <RecordingAside/>
                </div>
                <div className={style.rightDiv}>
                    <h1 className={style.title}>Recordings</h1>
                    <div className={style.divv}>
                        <LastDayAddFilter/>
                    </div>
                    <div>
                        <RecordingsHeader checkbox={<Checkbox onClick={() => setHeaderButton(!headerButton)}/>}/>
                        
                        <RecordingsInformation 
                            checkbox={headerButton ? <Checkbox defaultChecked onClick={() => setInfoButton(!infoButton)}/> : 
                                                        <Checkbox onClick={() => setInfoButton(!infoButton)}/>}
                            infoprops={infoButton}
                            labelBtn={<Button {...buttonProps} />} 
                            topAssetsMirror={<Button {...btnMirrorProps}/>}
                            topAssetsEns={ <Button {...btnEnsProps}/>}
                            topAssetsApe={ <Button {...btnApeProps}/>}
                            // walletImage={}
                            walletAge={'300 days'}
                            totalAssets={"19.6 ETH"}
                            dateProps={"15 Mar, 19:06"}
                            countryProps={"Estonia"}
                            actionProps={"27"}
                            pagesProps={"2"}
                            durationProps={"0:49"}
                            landingPage={"/home"}
                            exitPage={"/wallet-connect"}/>
                        <RecordingsInformation 
                            checkbox={headerButton ? <Checkbox defaultChecked onClick={() => setInfoButton(!infoButton)}/> : 
                                                        <Checkbox onClick={() => setInfoButton(!infoButton)}/>}
                            infoprops={infoButton}
                            labelBtn={<Button {...buttonProps} />} 
                            topAssetsMirror={<Button {...btnMirrorProps}/>}
                            topAssetsEns={ <Button {...btnEnsProps}/>}
                            topAssetsApe={ <Button {...btnApeProps}/>}
                            // walletImage={}
                            walletAge={'300 days'}
                            totalAssets={"19.6 ETH"}
                            dateProps={"15 Mar, 19:06"}
                            countryProps={"Estonia"}
                            actionProps={"27"}
                            pagesProps={"2"}
                            durationProps={"0:49"}
                            landingPage={"/home"}
                            exitPage={"/wallet-connect"}/>
                        <RecordingsInformation
                            checkbox={headerButton ? <Checkbox defaultChecked onClick={() => setInfoButton(!infoButton)}/> : 
                                                        <Checkbox onClick={() => setInfoButton(!infoButton)}/>}
                            infoprops={infoButton}
                            labelBtn={<Button {...buttonProps} />} 
                            topAssetsMirror={<Button {...btnMirrorProps}/>}
                            topAssetsEns={ <Button {...btnEnsProps}/>}
                            topAssetsApe={ <Button {...btnApeProps}/>}
                            // walletImage={}
                            walletAge={'300 days'}
                            totalAssets={"19.6 ETH"}
                            dateProps={"15 Mar, 19:06"}
                            countryProps={"Estonia"}
                            actionProps={"27"}
                            pagesProps={"2"}
                            durationProps={"0:49"}
                            landingPage={"/home"}
                            exitPage={"/wallet-connect"}/>
                    </div>
                </div>
            </div>
        </>
    )
}
