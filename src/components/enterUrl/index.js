import React from "react";
import style from "./assets/css/style.module.css";
import { useContext } from "react";
import { useRef } from "react";
import { useState } from "react";
import { MyContext } from "../../context/AccountProvider";
import Button from "@/UI/button/Button";
import Input from "@/UI/input";
import globe from "./assets/images/globe.svg";
import { buttonProps, errMessage, inputProps } from "./constants";

function EnterUrl({ setIsVerSucc }) {
  const [state, dispatch] = useContext(MyContext);
  const inpRef = useRef();

  const [isOnChange, setIsOnchange] = useState(true);
  const [onChangeEvent, setOnChangeEvent] = useState("");

  const onClick = () => {
    if (onChangeEvent === "") {
      setIsOnchange(false);
      return;
    } else {
      setIsOnchange(true);
    }

    if (isOnChange) {
      setIsVerSucc(true);
      dispatch({
        type: "setEnterUrl",
        payload: inpRef.current.value,
      });
    }
  };

  return (
    <main className={style.main}>
      <div className={style.header}>
        <h1>Where do you want to install Usersnap?</h1>
        <strong>Enter a valid URL or IP address</strong>
        <p>We'll use it to personalize your setup process</p>
      </div>

      <div className={style.inputWrapper}>
        <div>
          <img src={globe.src} alt="globe" />

          <Input
            {...inputProps}
            setOnChangeEvent={setOnChangeEvent}
            setIsOnchange={setIsOnchange}
            inpRef={inpRef}
            border={`${
              !isOnChange ? "1px solid #dc3545" : "1px solid #c8c8c8"
            }`}
          />
        </div>
        {!isOnChange && <p className={style.errMessage}>{errMessage}</p>}
      </div>
      <div>
        <Button onClick={onClick} {...buttonProps} />
      </div>
    </main>
  );
}

export default EnterUrl;
