import Head from "next/head";
import style from "./assets/css/style.module.css";
import Button from "@/UI/button/Button";
import InstallBox from "@/components/InstallBox/InstallBox";
import CodeBox from "@/components/CodeBox/CodeBox";

export default function Overview() {
  const codeText = `(num) => num + 1
  (num) => num + 1
  for(let i = 0; i<5;i++) {
      const count = 78;
      4544555
  }`;

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Overview page</title>
      </Head>

      <div className={style.container}>
        <InstallBox
          title="Install UserSnap"
          leftBottom1={
            <Button
              padding="7px 15px"
              borderRadius="5px"
              color="#418EFD"
              text="Verify installation"
              textColor="white"
              border="solid 2px #418EFD"
            />
          }
          leftBottom2={
            <Button
              padding="4px 9px"
              color="#F4F7FF"
              text="Other ways to install"
              textColor="black"
              border="none"
              margin="0px 0px 0px 40px"
            />
          }
          rightBottom1={"3342123"}
        >
          <CodeBox code={codeText} />
        </InstallBox>
      </div>
    </>
  );
}
