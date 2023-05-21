import Head from "next/head";
import style from "./assets/css/style.module.css";
import Emptydataview from "../../components/emptydataview";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Recording() {
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
    content = <h2>Verified</h2>
  }


  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Recordings page</title>
      </Head>

      {content}
    </>
  );
}
