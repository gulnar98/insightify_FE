import Head from "next/head";
import style from "./assets/css/style.module.css";

export default function Login() {
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login page</title>
      </Head>

      <h1>Login page</h1>
    </>
  );
}

export async function getStaticProps() {
  return { props: { isLogin: true } };
}
