import { useEffect } from "react";
import { useAccount } from "wagmi";


export default function App ({
    Component,
    callLogOut,
    callRefreshToken,
    componentWithLayout,
    inter
}) {
    const { isConnected, isDisconnected } = useAccount();
    useEffect(() => {
        switch (Component.name) {
        case "Login":
        case "CreateAccountPage":
        case "CodeInstallPage":
            document.body.className = "login";
            break;
        default:
            document.body.className = "dashboard";
        }
    }, [Component.name]);

    useEffect(() => {
        if (isDisconnected) {
        callLogOut().then(callRefreshToken);
        }
    }, [isDisconnected]);
    return (
        <>
        <main className={inter.className}>{componentWithLayout}</main>
        </>
    );
}