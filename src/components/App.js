import { useRouter } from "next/router";
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
    const router = useRouter();

    useEffect(() => {
        if (!router?.pathname) {
            return;
        }

        switch (router.pathname) {
        case "/login":
        case "/account/create":
        case "/code/install":
            document.body.className = "login";
            break;
        default:
            document.body.className = "dashboard";
        }
    }, [router?.pathname]);

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