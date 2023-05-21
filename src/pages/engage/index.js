import style from "./assets/css/style.module.css";
import Head from "next/head";
import VotePopup from "../../components/VotePopUp";

export default function Engage() {
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Engage page</title>
      </Head>

      <div className={style.container}>
        <VotePopup />
      </div>
    </>
  );
}
