import Head from "next/head";
import style from "./assets/css/style.module.css";
import VotePopup from "../../components/VotePopUp";

export default function Funnels() {
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Funnels page</title>
      </Head>

      <div className={style.container}>
        <VotePopup />
      </div>
    </>
  );
}
