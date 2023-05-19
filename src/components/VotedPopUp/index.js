import React from "react";
import success from "./asset/image/Success.svg";
import styles from "./asset/css/style.module.css";
import Button from "../../UI/button/Button";

function VotedPopUp() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <img className={styles.iconImg} src={success.src} alt="success" />
        </div>
        <div className={styles.textContainer}>
          <h3>Successfully voted!</h3>
        </div>
        <div className={styles.btnContainer}>
          <Button
            btncolor="#1f75cc"
            textColor="#ffff"
            text="Contunie"
            padding="12px 100px"
            border="none"
            borderRadius="4px"
            fontSize="12px"
          />
        </div>
      </div>
    </>
  );
}

export default VotedPopUp;
