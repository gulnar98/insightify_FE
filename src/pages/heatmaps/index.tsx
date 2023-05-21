import Head from "next/head";
import style from "./assets/css/style.module.css";
import { useCallback, useEffect, useState } from "react";
import Emptydataview from "../../components/emptydataview";
import { useRouter } from "next/router";
import HeatmapList from "@/components/Heatmap/HeatmapList";

export default function Heatmaps() {

  const [isLoading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      fetch("/api/code/verify")
        .then(result => result.json())
        .then(({verified}) => {
          setVerified(state => verified);
        })
        .finally(() => {
          setLoading(state => false);
        });
    } catch (err) {

    }
  }, []);

  const installCodeClick = useCallback(() => {
    router.push('/overview');
  }, [router]);

  let content = null;

  if (isLoading) {
    content = <h2>Loading...</h2>
  } else if (!isLoading && !verified) {
    content = (
      <div className={style.main}>
        <h1 className={style.title}>Recordings</h1>
        <Emptydataview buttonOnClick={installCodeClick} />
      </div>
    );
  } else {
    content = <HeatmapList />
  }


  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Heatmap</title>
      </Head>

      {content}
    </>
  );
}
