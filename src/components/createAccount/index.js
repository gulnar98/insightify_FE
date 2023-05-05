import style from "./assets/css/style.module.css";
import { useContext, useState } from "react";
import globe from "./assets/images/globe.svg";
import Button from "../../UI/button/Button";
import Input from "../../UI/input";
import { MyContext } from "../../context/AccountProvider";
import { useRef } from "react";

import { buttonProps, errMessage, inputProps } from "./constants";
import { useAccount } from "wagmi";

function CreateAccount() {
  const { address } = useAccount();
  const shortAddress = `${address?.slice(0, 6)}....`;

  const Steps = {
    step1: {
      welcome: `Welcome, ${shortAddress} Let’s get you all set up`,
      question: "What’s your DAO name?",
      placeholder: "Usersnap",
    },
    step2: {
      question: "What’s your role?",
      placeholder: "Usersnap",
    },
    step3: {
      question: "Where do you want to install Usersnap?",
      enterUrl: "Enter a valid URL or IP address",
      subtitle: "We'll use it to personalize your setup process",
      globeImg: globe.src,
      placeholder: "e.g https://example.com",
    },
  };

  const [state, dispatch] = useContext(MyContext);
  const inpRef = useRef();
  const [activeStep, setActiveStep] = useState("step1");
  const ActiveStep = Steps[activeStep];

  const [isOnChange, setIsOnchange] = useState(true);
  const [onChangeEvent, setOnChangeEvent] = useState("");

  const checkIsOnChange = () => {
    if (onChangeEvent === "") {
      setIsOnchange(false);
    } else {
      setIsOnchange(true);

      return onChangeEvent !== "";
    }

    const writeInputState = () => {
      switch (activeStep) {
        case "step1":
          dispatch({
            type: "setDaoName",
            payload: inpRef.current.value,
          });
          return;
        case "step2":
          dispatch({
            type: "setRole",
            payload: inpRef.current.value,
          });
          return;
        case "step3":
          dispatch({
            type: "setEnterUrl",
            payload: inpRef.current.value,
          });
          dispatch({
            type: "setIsInstalledStep",
          });
          return;
        default:
          break;
      }
    };

    const handleNext = () => {
      if (!checkIsOnChange()) {
        return;
      }

      if (isOnChange) {
        writeInputState();

        const currentStepNumber = Number(activeStep.slice(-1));
        setActiveStep(`step${currentStepNumber + 1}`);

        inpRef.current.value = "";
        setOnChangeEvent("");
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
          {!isOnChange && <p className={style.errMessage}>{errMessage}</p>}
        </div>
        <div>
          <Button onClick={handleNext} {...buttonProps} />
        </div>
      </main>
    );
  };
}

export default CreateAccount;
