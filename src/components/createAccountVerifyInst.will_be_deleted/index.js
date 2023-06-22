import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { MyContext } from ".././../context/AccountProvider";
import CreateAccount from "../createAccount";
import InstallVerificationBox from "../installVerificationBox";
import { useAccount, useSignMessage } from "wagmi";

function CreateAccountVerifyInst() {
  const [state, dispatch] = useContext(MyContext);
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
        }).catch(err => console.log(err));
    }
  }, [isSuccess]);

  return (
    <>
      {!state.isInstalledStep ? <CreateAccount /> : <InstallVerificationBox />}
    </>
  );
}

export default CreateAccountVerifyInst;
