import style from "./assets/css/style.module.css";
import React from "react";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import copy from "./assets/images/copy.svg";

export default function CodeBox({ code }) {
  const [isCopy, setIsCopy] = useState(false);

  const customStyle = {
    backgroundColor: "inherit",
    flex: 1,
    lineHeight: 1.5,
    marginLeft: "-32px",
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setIsCopy(true);

    setTimeout(() => {
      setIsCopy(false);
    }, 2000);
  };

  return (
    <>
      <div className={style.main}>
        <div className={style.code}>
          <SyntaxHighlighter
            language="javascript"
            customStyle={customStyle}
            wrapLines={true}
            showLineNumbers
          >
            {code}
          </SyntaxHighlighter>
        </div>

        <div className={style.copy}>
          <button onClick={handleCopyCode} className={style.btnCopy}>
            {isCopy ? (
              "Copied"
            ) : (
              <>
                <img src={copy.src} /> Copy
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
