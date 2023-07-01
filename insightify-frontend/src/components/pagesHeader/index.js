import style from "./style.module.css";
import Button from "../../UI/button/Button";

function PagesHeader({ title, url, shareButtonProps, savedButtonProps }) {
  return (
    <header className={style.header}>
      <div className={style.leftSection}>
        <h1 className={style.title}>{title}</h1>
        {url && <p className={style.subtitle}>Url is: {url}</p>}
      </div>
      <div className={style.rightSection}>
        <Button {...shareButtonProps} />
        <Button {...savedButtonProps} />
      </div>
    </header>
  );
}

export default PagesHeader;
