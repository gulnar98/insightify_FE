import style from "./assets/css/style.module.css";
import Button from "@/UI/button/Button";
import Input from "@/UI/input";
import { useContext, useRef, useState } from "react";
import { MyContext } from "../../context/AccountProvider";

export default function DaoNameRoleInput({ setIsInstallBox }) {
  const [state, dispatch] = useContext(MyContext);
  const inpRef = useRef();

  const [isRoleStep, setIsRoleStep] = useState(false);
  const [isRequiredInput, setIsRequiredInput] = useState(false);
  const [isOnChange, setIsOnchange] = useState(true);

  const onClick = () => {
    if (!isRoleStep) {
      if (isOnChange) {
        dispatch({
          type: "setDaoName",
          payload: inpRef.current.value,
        });
        setIsRoleStep(true);

        inpRef.current.value = "";
      }
    } else {
      if (isOnChange) {
        setIsInstallBox(true);
        dispatch({
          type: "setIsInstalledStep" || "setRole",
          payload: inpRef.current.value,
        });
        dispatch({
          type: "setRole",
          payload: inpRef.current.value,
        });
      }
    }
  };

  return (
    <>
      <div className={style.main}>
        <div style={{ marginBottom: 18 }}>
          {!isRoleStep && (
            <p className={style.welcome}>
              Welcome, 0xe7A21..... Let’s get you all set up
            </p>
          )}
          <p className={style.question}>
            {!isRoleStep ? "What’s your DAO name?" : "What’s your role?"}
          </p>
        </div>

        <div className={style.inputWrapper}>
          <Input
            setIsOnchange={setIsOnchange}
            inpRef={inpRef}
            padding="20px 24px"
            borderRadius="12px"
            color="#F8F9FC"
            text="Next"
            border={`${
              !isOnChange ? "1px solid #dc3545" : "1px solid #c8c8c8"
            }`}
            width="100%"
            textColor="black"
            fontSize="1em"
            margin="0 0 6px 0"
          />
          {!isOnChange && (
            <p className={style.errMessage}>This field is required</p>
          )}
        </div>
        <div>
          <Button
            padding="10px 16px"
            borderRadius="12px"
            color="#F8F9FC"
            text="Next"
            textColor="#303742"
            border="solid 1px #C8C8C8"
            fontSize="24px"
            onClick={onClick}
          />
        </div>
      </div>
    </>
  );
}
