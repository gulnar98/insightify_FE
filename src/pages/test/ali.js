import Button from "../../UI/button/Button";
import ListViewDelete from "../../components/list-view-delete";
import RecordingsHeader from "../../components/recordingsHeader";
import RecordingsInformation from "../../components/recordingsInformation";


export default function Ali() {
    // const buttonProps = {
    //   btncolor: "#1F75CC",
    //   btncolorHover: "#1F75CC",
    //   text: "NFT Whale",
    //   textColorHover: "white",
    //   border: "solid 1px #1F75CC",
    //   textColor: "white",
    //   borderRadius: "4px",
    //   padding: "7px 15px",
    //   fontSize: "1em"
    // };

    // const btnMirrorProps = {
    //     btncolor: "rgb(255, 255, 255)",
    //     btncolorHover: "rgb(255, 255, 255)",
    //     text: "MIRROR",
    //     textColorHover: "#707070",
    //     border: "solid 1px #707070",
    //     textColor: "#707070",
    //     borderRadius: "5px",
    //     padding: "7px 10px",
    //     fontSize: "1em"
    // }

    // const btnEnsProps = {
    //     btncolor: "rgb(255, 255, 255)",
    //     btncolorHover: "rgb(255, 255, 255)",
    //     text: "ENS",
    //     textColorHover: "#707070",
    //     border: "solid 1px #707070",
    //     textColor: "#707070",
    //     borderRadius: "5px",
    //     padding: "7px 10px",
    //     fontSize: "1em"
    // }

    // const btnApeProps = {
    //     btncolor: "rgb(255, 255, 255)",
    //     btncolorHover: "rgb(255, 255, 255)",
    //     text: "APE",
    //     textColorHover: "#707070",
    //     border: "solid 1px #707070",
    //     textColor: "#707070",
    //     borderRadius: "5px",
    //     padding: "7px 10px",
    //     fontSize: "1em"
    // }
  
    return (
      <>
        {/* <RecordingsHeader />
        <RecordingsInformation  
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
            exitPage={"/wallet-connect"}
            /> */}
            <ListViewDelete/>
      </>
    );
  }