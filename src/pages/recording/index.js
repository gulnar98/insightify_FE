import Head from "next/head";
import style from "./assets/css/style.module.css";
import Emptydataview from "../../components/emptydataview";

export default function Recording() {
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Recordings page</title>
      </Head>

      <div className={style.main}>
        <h1 className={style.title}>Recordings</h1>
        <Emptydataview/>
      </div>
    </>
  );
}
