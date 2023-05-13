import style from "./assets/css/style.module.css";
import React from "react";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import copy from "./assets/images/copy.svg";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export default function CodeBox({ code }) {
  const [isCopy, setIsCopy] = useState(false);

  const customStyle = {
    backgroundColor: "inherit",
    flex: 1,
    lineHeight: 1.5,
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
        <div className={style.codeWrapper}>
          <SyntaxHighlighter
            style={docco}
            language="javascript"
            customStyle={customStyle}
            wrapLines={true}
            showLineNumbers
            className={style.code}
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
