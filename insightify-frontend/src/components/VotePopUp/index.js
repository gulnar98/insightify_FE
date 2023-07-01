import React from "react";
import Button from "../../UI/button/Button";
import notification from "./asset/images/notification.svg";
import styles from "./asset/css/style.module.css";
import iconX from "./asset/images/Xicon.svg";

function VotePopUp({ setIsVotePopup }) {
  const onClick = () => {
    setIsVotePopup(false);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <div className={styles.closeBtn}>
          <Button
            onClick={onClick}
            border="none"
            btncolor="#ffff"
            imgprops={iconX.src}
          />
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
            textColorHover="#1F75CC"
            text="Vote"
            padding="12px 120px"
            borderRadius="4px"
            fontSize="16px"
            border="1px solid #1F75CC"
          />
        </div>
      </div>
    </div>
  );
}

export default VotePopUp;
