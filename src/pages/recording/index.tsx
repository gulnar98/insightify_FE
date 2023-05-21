import Head from "next/head";
import style from "./assets/css/style.module.css";
import Emptydataview from "../../components/emptydataview";
import RRWebPlayer from "../../components/rrweb-player";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Recording() {
  const [isLoading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [sessions, setSessions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    try {
      fetch("/api/code/verify?ro=1")
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

  useEffect(() => {
    if (isLoading || !verified) {
      return;
    }

    fetch(`/api/record/sessions`)
      .then(result => result.json())
      .then(({sessions}) => {
        setSessions(sessions);
      });

  }, [isLoading, verified])

  const installCodeClick = useCallback(() => {
    router?.push('/overview');
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
    content = (
      <ul>
        {sessions?.map((session,index) => (
          <li key={`record-session-${index}`} style={{display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 20}}>
            <div>Page: {session.jsReferer}</div>
            <div>Device: {session.isMobile ? 'Mobile' : 'Comp'}</div>
            <div>Lang: {session.lang}</div>
            <div>Platform: {session.platform}</div>
            <div>Wallets: {JSON.stringify(session.wallets, null, 4)}</div>
            <div>
              <Link href={`/recording/${session.sessionId}/play`}>Play</Link>
            </div>
          </li>
        ))}
      </ul>
    )
  }


  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Recordings page</title>
      </Head>

      {content}
    </>
  );
}
