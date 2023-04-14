import style from './assets/css/style.module.css'
import React from 'react';
import { useState } from 'react';
import SyntaxHighlighter from "react-syntax-highlighter";

export default function CodeBox({code}) {
    const [isCopy, setIsCopy] = useState(false);
  
    const customStyle = {
      backgroundColor: "white",
      padding: 15,
      flex: 1,
      lineHeight: 1.5,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5
    };
  
    const handleCopyCode = () => {
      navigator.clipboard.writeText(code);
      console.log(code)
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
                    showLineNumbers
                    >
                    {code}
                    </SyntaxHighlighter>
                </div>

                <div className={style.copy}>
                    <button onClick={handleCopyCode} className={style.btnCopy}>{isCopy ? "Copied" : "❐Copy"}</button>
                </div>
            </div>
        </>
    );
}