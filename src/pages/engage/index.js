import style from "./assets/css/style.module.css";
import Head from "next/head";
import VotePopup from "../../components/VotePopUp";
import { useState } from "react";

export default function Engage() {
  const [isVotePopup, setIsVotePopup] = useState(true);

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Engage page</title>
      </Head>

      <div className={style.container}>
        {isVotePopup && <VotePopup setIsVotePopup={setIsVotePopup} />}
      </div>
    </>
  );
}
