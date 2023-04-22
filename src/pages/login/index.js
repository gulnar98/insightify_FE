import Head from "next/head";
import style from "./assets/css/style.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";

export default function Login() {
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login page</title>
      </Head>

      <div
        style={{
          padding: 32,
          textAlign: "center",
          width: "fit-content",
        }}
      >
        <h1 style={{ marginBottom: 16 }}>Login page</h1>
        <ConnectButton />
      </div>
    </>
  );
}

export async function getStaticProps() {
  return { props: { isLogin: true } };
}
