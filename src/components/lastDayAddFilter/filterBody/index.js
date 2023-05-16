import styles from "./asset/css/style.module.css";
import icon from "./asset/image/label.svg";
import Link from "next/link";

function FilterBody(props) {
  const text = props.text || "Label";
  const iconSrc = props.iconSrc || icon;

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.textContainer}>
          <img className={styles.icon} src={iconSrc} alt="icon" />
          <Link href="#" className={styles.text}>
            {text}
          </Link>
        </div>
      </div>
    </>
  );
}

export default FilterBody;
