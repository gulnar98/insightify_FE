import Head from "next/head";
import style from "./assets/css/style.module.css";
import InstallVerificationBox from "../../components/installVerificationBox";
import { useState } from "react";
import { useEffect } from "react";
import Button from "../../UI/button/Button";
import { shareBtnProps } from "../../components/constants";

export default function Overview() {
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Overview page</title>
      </Head>

      <div className={style.container}>
        <header className={style.header}>
          <h1 className={style.title}>Overview</h1>
          <Button {...shareBtnProps} />
        </header>
        <InstallVerificationBox forOverview={true} />
      </div>
    </>
  );
}
