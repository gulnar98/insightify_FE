import { useContext, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { MyContext } from "../../context/AccountProvider";
import InstallBox from "../InstallBox/InstallBox";
import { useEffect } from "react";
import CodeBox from "../CodeBox/CodeBox";
import Button from "../../UI/button/Button";
import VerifyPopUp from "../verifyPopUp";
import Verification from "../verification";
import style from "./assets/css/style.module.css";
import VerifySucces from "../verifySucces";
import DaoNameRoleInput from "../daoNameRoleInput";
import Head from "next/head";

function CreateAccount() {
  const message = process.env.NEXT_PUBLIC_WEB3_SIGN_MESSAGE;
  const { address, isConnected } = useAccount();
  const { data: sign, isSuccess, signMessage } = useSignMessage({ message });
  const [isInstallBox, setIsInstallBox] = useState(false);
  const [isVerifyInst, setIsVerifyInst] = useState(false);
  const [codeText, setCodeText] = useState('');
  const [isVerSucc, setIsVerSucc] = useState(false);
  const [isVerExit, setIsVerExit] = useState(false);
  const [state, dispatch] = useContext(MyContext);

  useEffect(() => {
    (async () => {
      if (!isInstallBox) {
        return;
      }

      try {
        const response = await fetch('/api/code');
        const codeText = await response.text();
        setCodeText(codeText);
      } catch {}
    })();
  }, [isInstallBox]);

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

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login page</title>
      </Head>
      <div>
        {!isInstallBox ? (
          <DaoNameRoleInput setIsInstallBox={setIsInstallBox} />
        ) : (
          <>
            <InstallBox
              title="Install UserSnap"
              leftBottom1={
                <Button
                  onClick={() => {
                    setIsVerifyInst(true);
                    setIsVerExit(false);
                  }}
                  padding="7px 15px"
                  borderRadius="5px"
                  btncolor="#418EFD"
                  text="Verify installation"
                  textColor="white"
                  border="solid 2px #418EFD"
                />
              }
              leftBottom2={
                <Button
                  padding="4px 9px"
                  btncolor="inherit"
                  text="Other ways to install"
                  textColor="black"
                  border="none"
                  margin="0px 0px 0px 40px"
                />
              }
              rightBottom1={"3342123"}
            >
              <CodeBox code={codeText} />
            </InstallBox>
            {isVerifyInst && !isVerExit && (
              <div
                className={`${style.verification} ${isVerifyInst && "popupBg"}`}
              >
                <div className={style.verificContent}>
                  <Verification
                    imgName={"success"}
                    setIsVerExit={setIsVerExit}
                    setIsVerifyInst={setIsVerifyInst}
                    setIsVerSucc={setIsVerSucc}
                  >
                    {!isVerSucc ? (
                      <VerifyPopUp
                        className={isVerifyInst && "popupBg"}
                        title={"Verify your installation"}
                        about={
                          "Enter the URL of the site you installed Usersnap into the field below."
                        }
                        address={
                          "e.g. https://wwyoursite.com or https://localhost:1905"
                        }
                        button={
                          <Button
                            onClick={() => {
                              setIsVerSucc(true);
                              setIsVerExit(false);
                            }}
                            padding="7px 15px"
                            borderRadius="5px"
                            btncolor="#418EFD"
                            text="Verify installation"
                            textColor="white"
                            border="solid 2px #418EFD"
                          />
                        }
                      />
                    ) : (
                      <VerifySucces imgName="success" />
                    )}
                  </Verification>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default CreateAccount;
