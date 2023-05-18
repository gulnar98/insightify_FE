import React from "react";
import Button from "../../UI/button/Button";
import notification from "./asset/images/notification.svg";
import styles from "./asset/css/style.module.css";
import iconX from "./asset/images/Xicon.svg";

function VotePopUp() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.closeBtn}>
          <Button border="none" btncolor="#ffff">
            <img className={styles.Xicon} src={iconX.src} alt="iconX" />
          </Button>
        </div>
        <div className={styles.imgContainer}>
          <img src={notification.src} />
        </div>
        <div className={styles.textContainer}>
          <h3 className={styles.title}>
            Sorry. We’re currently working on this functionality. You’ll have
            soon.
          </h3>
          <p className={styles.text}>
            If you want to use this function ASAP, you can bring it to the
            top-of ourbacklog by voting.
          </p>
        </div>
        <div className={styles.btn}>
          <Button
            btncolor="#1f75cc"
            textColor="#ffff"
            text="Vote"
            padding="10px 100px"
            border="none"
            borderRadius="4px"
            fontSize="12px"
          />
        </div>
      </div>
    </>
  );
}

export default VotePopUp;
