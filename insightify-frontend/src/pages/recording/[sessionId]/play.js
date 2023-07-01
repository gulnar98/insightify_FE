import Head from "next/head";
// import style from "./assets/css/style.module.css";
import RRWebPlayer from "../../../components/rrweb-player";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Recording() {

  const [events, setEvents] = useState([]);
  const router = useRouter();
  const {sessionId} = router.query;

  useEffect(() => {
    if (!sessionId) {
        return;
    }

    fetch(`/api/record/${sessionId}/play`)
        .then(result => result.json())
        .then(result => setEvents(result));
  }, [sessionId]);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Recordings page</title>
      </Head>

      {events?.records?.length && <RRWebPlayer events={events} />}
    </>
  );
}
