import Head from "next/head";
import style from "./assets/css/style.module.css";
import Emptydataview from "../../components/emptydataview";
import RRWebPlayer from "../../components/rrweb-player";
import HandlerecordPage from "../../components/handlerecordPage";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import PagesHeader from "@/components/pagesHeader";
import Loading from "@/components/loading";

const alertProps = {
  color: "#FFF2DA",
  border: "solid 1px #FFC04D",
  textColor: "#000000",
  borderRadius: "4px",
  padding: "7px 15px",
  text: "Install the Insightify to get started",
  margin: "22px 0px 0px 0px",
  width: "31%",
  fontWeight: "600",
};

const buttonProps = {
  btncolor: "#1F75CC",
  btncolorHover: "#1F75CC",
  text: "Install Insightify",
  textColorHover: "white",
  border: "solid 1px #1F75CC",
  textColor: "white",
  borderRadius: "4px",
  padding: "7px 15px",
  fontSize: "1em",
  margin: "18px 0px",
};

export default function Recording() {
  const [isLoading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [forceReload, setForceReload] = useState(0);
  const router = useRouter();

  useEffect(() => {
    try {
      fetch("/api/code/verify?ro=1")
        .then((result) => result.json())
        .then(({ verified }) => {
          setVerified((state) => verified);
        })
        .finally(() => {
          setLoading((state) => false);
        });
    } catch (err) {}
  }, []);

  useEffect(() => {
    if (isLoading || !verified) {
      return;
    }

    let p = ``;
    if (router?.query?.p) {
      p = `p=${router?.query?.p}`;
    }

    fetch(`/api/record/sessions?${p}`)
      .then((result) => result.json())
      .then(({ sessions }) => {
        setSessions(sessions);
      });

  }, [isLoading, verified, router?.query?.p, forceReload])

  const installCodeClick = useCallback(() => {
    router?.push("/overview");
  }, [router]);

  let content = null;

  if (isLoading) {
    content = (
      <div className={style.loadingWrapper}>
        <PagesHeader title={"Heatmaps"} />
        <Loading title={"Heatmaps"} />
      </div>
    );
  } else if (!isLoading && !verified) {
    content = (
      <div className={style.emptyDataViewWrapper}>
        <h1 className={style.title}>Recordings</h1>
        <Emptydataview buttonOnClick={installCodeClick} />
      </div>
    );
  } else {
    content = (
      <div className={style.main}>
        <HandlerecordPage sessions={sessions} forceReload={setForceReload} />
      </div>
    );
  }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Recordings page</title>
      </Head>

      {content}
    </>
  );
}
