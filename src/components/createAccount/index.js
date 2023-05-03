import style from "./assets/css/style.module.css";
import { useContext, useState } from "react";
import { MyContext } from "../../context/AccountProvider";
import InstallBox from "../InstallBox/InstallBox";
import CodeBox from "../CodeBox/CodeBox";
import Button from "../../UI/button/Button";
import VerifyPopUp from "../verifyPopUp";
import Verification from "../verification";
import VerifySucces from "../verifySucces";
import DaoNameRoleInput from "../daoNameRoleInput";
import {
  leftBottom1Props,
  leftBottom2Props,
  verifyButtonProps,
  verifyPopUpProps,
} from "./constants";
import EnterUrl from "../enterUrl";

function CreateAccount() {
  const [isInstallBox, setIsInstallBox] = useState(false);
  const [isEnterUrl, setIsEnterUrl] = useState(false);
  const [isVerSucc, setIsVerSucc] = useState(false);
  const [isVerExit, setIsVerExit] = useState(false);
  const [state, dispatch] = useContext(MyContext);

  const codeText = `(num) => num + 1
  (num) => num + 1
  for(let i = 0; i<5;i++) {
      const count = 78;
      4544555
  }`;

  return (
    <>
      {!isInstallBox ? (
        <DaoNameRoleInput setIsInstallBox={setIsInstallBox} />
      ) : !isEnterUrl ? (
        <InstallBox
          title="Install UserSnap"
          leftBottom1={
            <Button
              onClick={() => {
                setIsEnterUrl(true);
                setIsVerExit(false);
              }}
              {...leftBottom1Props}
            />
          }
          leftBottom2={<Button {...leftBottom2Props} />}
          rightBottom1={"3342123"}
        >
          <CodeBox code={codeText} />
        </InstallBox>
      ) : (
        <>
          <EnterUrl setIsVerSucc={setIsVerSucc} />
          {isVerSucc && (
            <div className={`${style.verification} ${isVerSucc && "popupBg"}`}>
              <div className={style.verificContent}>
                <Verification
                  imgName={"success"}
                  setIsVerExit={setIsVerExit}
                  setIsVerSucc={setIsVerSucc}
                >
                  <VerifySucces imgName="success" />
                </Verification>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default CreateAccount;
