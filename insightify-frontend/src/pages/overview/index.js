import Head from "next/head";
import style from "./assets/css/style.module.css";
import InstallVerificationBox from "../../components/installVerificationBox";
import Button from "../../UI/button/Button";

export const shareBtnProps = {
  padding: "6px 12px",
  btncolor: "inherit",
  btncolorHover: "#2e8def",
  text: "Share",
  textColor: "#2e8def",
  textColorHover: "#fff",
  borderRadius: "6px",
  border: "1px solid #2e8def",
};

export default function Overview() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Overview page</title>
      </Head>

      <div className={style.container}>
        <header className={style.header}>
          <h1 className={style.title}>Overview</h1>
          <Button {...shareBtnProps} />
        </header>
        <InstallVerificationBox forOverview={true} />
      </div>
    </>
  );
}
