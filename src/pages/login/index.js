import Head from "next/head";
import style from "./assets/css/style.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSignMessage } from "wagmi";
import { useEffect } from "react";
<<<<<<< HEAD
import LoginWallet from "../../components/LoginWallet";
=======
import DatingUser from "@/components/datingUser";
>>>>>>> bd9d2e3701a3919f17086e7097635f5d16269481

export default function Login({ isNewUser }) {
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

<<<<<<< HEAD
      {isConnected ? <LoginWallet {...props} /> : <LoginWallet {...props} />}
=======
      {/* <div
        style={{
          padding: 32,
          textAlign: "center",
          width: "fit-content",
        }}
      >
        <h1 style={{ marginBottom: 16 }}>Login page {isNewUser && '(Yeni istifadəçi)'}</h1>
        {isConnected ? (
          <div>
            <button onClick={() => signMessage()}>Sign</button>
          </div>
        ) : <ConnectButton />}
      </div> */}
      <DatingUser/>
>>>>>>> bd9d2e3701a3919f17086e7097635f5d16269481
    </>
  );
}
