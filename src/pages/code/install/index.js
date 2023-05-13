import { useState } from "react";
import InstallVerificationBox from "../../../components/installVerificationBox";
import { useEffect } from "react";

function CodeInstallPage() {
  const [codeText, setCodeText] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/code");
        const codeText = await response.text();
        setCodeText(codeText);
      } catch {}
    })();
  }, []);

  return <InstallVerificationBox isCenter={true} codeText={codeText} />;
}

export default CodeInstallPage;
