import style from "./assets/css/style.module.css";
import Button from "@/UI/button/Button";
import Input from "@/UI/input";
import { useContext, useState } from "react";
import { MyContext } from "../../context/AccountProvider";

export default function DatingUser({ setIsInstallBox }) {
  const [isRoleStep, setIsRoleStep] = useState(false);
  const [state, dispatch] = useContext(MyContext);
  const onClick = () => {
    if (!isRoleStep) {
      setIsRoleStep(true);
    } else {
      setIsInstallBox(true);
      dispatch({
        type: "setIsInstalledStep",
      });
    }
  };

  return (
    <>
      <div className={style.main}>
        <div>
          {!isRoleStep && (
            <p className={style.welcome}>
              Welcome, 0xe7A21..... Let’s get you all set up
            </p>
          )}
          <p className={style.question}>
            {!isRoleStep ? "What’s your DAO name?" : "What’s your role?"}
          </p>
        </div>

        <div>
          <Input
            padding="20px 24px"
            borderRadius="12px"
            color="#F8F9FC"
            text="Next"
            border="solid 1px #C8C8C8"
            width="100%"
            textColor="black"
            fontSize="1em"
            margin="18px 0"
          />
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
