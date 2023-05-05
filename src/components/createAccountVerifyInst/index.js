import React from "react";
import { useContext } from "react";
import { useConnect } from "wagmi";
import { MyContext } from ".././../context/AccountProvider";
import CreateAccount from "../createAccount";
import InstallVerificationBox from "../installVerificationBox";
function CreateAccountVerifyInst() {
  const [state, dispatch] = useContext(MyContext);

  return (
    <>
      {!state.isInstalledStep ? <CreateAccount /> : <InstallVerificationBox />}
    </>
  );
}

export default CreateAccountVerifyInst;
