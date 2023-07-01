import style from "./assets/css/style.module.css";
import { useContext, useEffect, useState } from "react";
import globe from "./assets/images/globe.svg";
import Button from "../../UI/button/Button";
import Input from "../../UI/input";
import { useRef } from "react";

import { buttonProps, errMessage, inputProps } from "./constants";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

function CreateAccount() {
  const { address } = useAccount();
  const shortAddress = `${address?.slice(0, 6)}....`;

  const Steps = {
    step1: {
      welcome: `Welcome, ${shortAddress} Let’s get you all set up`,
      question: "What’s your DAO name?",
      placeholder: "Insightify",
    },
    step2: {
      question: "What’s your role?",
      placeholder: "Insightify",
    },
    step3: {
      question: "Where do you want to install Insightify?",
      enterUrl: "Enter a valid URL or IP address",
      subtitle: "We'll use it to personalize your setup process",
      globeImg: globe.src,
      placeholder: "e.g https://example.com",
    },
  };

  const inpRef = useRef();
  const [activeStep, setActiveStep] = useState("step1");
  const ActiveStep = Steps[activeStep];

  const [isOnChange, setIsOnchange] = useState(true);
  const [onChangeEvent, setOnChangeEvent] = useState("");
  const [userInfo, setUserInfo] = useState({ dao_name: "", role: "", url: "" });
  const router = useRouter();

  const checkIsOnChange = () => {
    if (onChangeEvent === "") {
      setIsOnchange(false);
    } else {
      setIsOnchange(true);

      return onChangeEvent !== "";
    }
  };

  const fetchData = () => {
    fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        action: "signup",
        dao_name: localStorage.getItem("dao_name"),
        role: localStorage.getItem("role"),
        url: localStorage.getItem("url"),
      }),
    })
      .then((result) => {
        if (result.status !== 200) {
          alert("Something went wrong. Try again!");
        } else {
          return result.json();
        }
      })
      .then((result) => {
        router.push("/code/install");
      });
  };

  useEffect(() => {
    switch (activeStep) {
      case "step1":
        setOnChangeEvent(
          localStorage.getItem("dao_name")==""
            ? localStorage.getItem("dao_name")
            : onChangeEvent
        );
        const dao_name = onChangeEvent;
        setUserInfo({
          ...userInfo,
          dao_name,
        });
        return;
      case "step2":
        setOnChangeEvent(
          localStorage.getItem("role")==""
            ? localStorage.getItem("role")
            : onChangeEvent
        );
        const role = onChangeEvent;
        setUserInfo({
          ...userInfo,
          role,
        });
        return;
      case "step3":
        setOnChangeEvent(
          localStorage.getItem("url")==""
            ? localStorage.getItem("url")
            : onChangeEvent
        );
        const url = onChangeEvent;
        setUserInfo({
          ...userInfo,
          url,
        });
        localStorage.setItem("url", url);
        return;
    }
  }, [activeStep]);
  const handlePrev=()=>{
    let currentStepNumber = Number(activeStep.slice(-1));
    setActiveStep(`step${currentStepNumber - 1}`);
  }

  const handleNext = async () => {
    if (!checkIsOnChange()) {
      return;
    }

    if (isOnChange) {
      let currentStepNumber = Number(activeStep.slice(-1));
      if (currentStepNumber === 1) {
        localStorage.setItem("dao_name", onChangeEvent);
        setActiveStep(`step${currentStepNumber + 1}`);
        inpRef.current.value = "";
        setOnChangeEvent("");
      } else if (currentStepNumber === 2) {
        localStorage.setItem("role", onChangeEvent);
        setActiveStep(`step${currentStepNumber + 1}`);
        inpRef.current.value = "";
        setOnChangeEvent("");
      } else if (currentStepNumber === 3) {
        localStorage.setItem("url", onChangeEvent);
        fetchData();
      }
    }
  };

  return (
    <main className={style.main}>
      <div className={style.header}>
        {ActiveStep?.welcome && (
          <p className={style.welcome}>{ActiveStep?.welcome}</p>
        )}
        {ActiveStep?.question && (
          <h1
            style={
              activeStep === "step3"
                ? { marginBottom: 18 }
                : { marginBottom: 0 }
            }
          >
            {ActiveStep?.question}
          </h1>
        )}
        {ActiveStep?.enterUrl && <strong>{ActiveStep?.enterUrl}</strong>}
        {ActiveStep?.subtitle && <p>{ActiveStep?.subtitle}</p>}
      </div>

      <div className={style.inputWrapper}>
        <div>
          {ActiveStep?.globeImg && (
            <img src={ActiveStep?.globeImg} alt="globe" />
          )}

          <Input
            {...inputProps}
            isOnChange={isOnChange}
            onChangeEvent={onChangeEvent}
            setOnChangeEvent={setOnChangeEvent}
            setIsOnchange={setIsOnchange}
            inpRef={inpRef}
            border={`${
              !isOnChange ? "1px solid #dc3545" : "1px solid #c8c8c8"
            }`}
            placeholder={ActiveStep?.placeholder}
            padding={
              activeStep !== "step3"
                ? "20px 20px 20px 24px"
                : "20px 20px 20px 62px"
            }
          />
        </div>
        {!isOnChange ? <p className={style.errMessage}>{errMessage}</p> : null}
      </div>
      <div style={{display:"flex"}}>
        {activeStep !== "step1" ? (
          <Button onClick={handlePrev} {...buttonProps} text="Previous"/>
        ) : null}
        <Button onClick={handleNext} {...buttonProps} />
      </div>
    </main>
  );
}

export default CreateAccount;
