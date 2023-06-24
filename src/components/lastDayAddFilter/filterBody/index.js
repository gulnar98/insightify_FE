import { useState } from "react";
import styles from "./asset/css/style.module.css";
import icon from "./asset/image/label.svg";
import Link from "next/link";
import VotePopUp from "../../VotePopUp";

function FilterBody(props) {
  const text = props.text || "Label";
  const iconSrc = props.iconSrc || icon;

  const onClick = () => {
    props.setIsVotePopup(true);
  };

  return (
    <>
      <Link onClick={onClick} href="#" className={styles.text}>
        <img className={styles.icon} src={iconSrc} alt="icon" />
        {text}
      </Link>
    </>
  );
}

export default FilterBody;
