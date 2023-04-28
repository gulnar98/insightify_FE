import Head from "next/head";
import style from "./assets/css/style.module.css";
import { useAccount, useSignMessage } from "wagmi";
import { useEffect } from "react";
import LoginWallet from "../../components/LoginWallet";

export default function Login() {
  const message = process.env.NEXT_PUBLIC_WEB3_SIGN_MESSAGE;
  const { address, isConnected } = useAccount();
  const { data: sign, isSuccess, signMessage } = useSignMessage({ message });

  useEffect(() => {
    if (isSuccess) {
      fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          action: "login",
          address,
          sign,
        }),
      })
        .then((result) => {
          if (result.status !== 200) {
            // error
          } else {
            return result.json();
          }
        })
        .then((result) => {
          window.location.reload();
        });
    }
  }, [isSuccess]);

  const props = { isConnected, signMessage };

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login page</title>
      </Head>

      {!isConnected ? <LoginWallet {...props} /> : <LoginWallet {...props} />}
    </>
  );
}
