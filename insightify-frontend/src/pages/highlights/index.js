import Head from "next/head";
import style from "./assets/css/style.module.css";
import VotePopup from "../../components/VotePopUp";
import { useState } from "react";

export default function Highlights() {
  const [isVotePopup, setIsVotePopup] = useState(true);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Highlights page</title>
      </Head>

      <div className={style.container}>
        {isVotePopup && <VotePopup setIsVotePopup={setIsVotePopup} />}
      </div>
    </>
  );
}
