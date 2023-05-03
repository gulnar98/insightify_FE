import style from "./assets/css/style.module.css";
import Button from "@/UI/button/Button";
import Input from "@/UI/input";
import { useContext, useRef, useState } from "react";
import { MyContext } from "../../context/AccountProvider";
import { buttonProps, errMessage, inputProps } from "./constant";

export default function DaoNameRoleInput({ setIsInstallBox }) {
  const [state, dispatch] = useContext(MyContext);
  const inpRef = useRef();

  const [isRoleStep, setIsRoleStep] = useState(false);
  const [isOnChange, setIsOnchange] = useState(true);
  const [onChangeEvent, setOnChangeEvent] = useState("");

  const onClick = () => {
    if (onChangeEvent === "") {
      setIsOnchange(false);
      return;
    } else {
      setIsOnchange(true);
    }

    if (!isRoleStep) {
      if (isOnChange) {
        dispatch({
          type: "setDaoName",
          payload: inpRef.current.value,
        });
        setIsRoleStep(true);

        inpRef.current.value = "";
        setOnChangeEvent("");
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
        <div className={style.header}>
          {!isRoleStep && (
            <h1 className={style.welcome}>
              Welcome, 0xe7A21..... Let’s get you all set up
            </h1>
          )}
          <p className={style.question}>
            {!isRoleStep ? "What’s your DAO name?" : "What’s your role?"}
          </p>
        </div>

        <div className={style.inputWrapper}>
          <Input
            setOnChangeEvent={setOnChangeEvent}
            setIsOnchange={setIsOnchange}
            inpRef={inpRef}
            border={`${
              !isOnChange ? "1px solid #dc3545" : "1px solid #c8c8c8"
            }`}
            {...inputProps}
          />
          {!isOnChange && <p className={style.errMessage}>{errMessage}</p>}
        </div>
        <div>
          <Button onClick={onClick} {...buttonProps} />
        </div>
      </div>
    </>
  );
}
