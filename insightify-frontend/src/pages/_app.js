import DashboardLayout from "@/components/dashboardLayout";
import CreateAccount from "@/components/createAccount";
import HeatmapProvider from "@/context/HeatmapProvider";
import "../assets/css/reset.css";
import { Inter } from "next/font/google";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import {
  configureChains,
  createClient,
  useAccount,
  useSignMessage,
  WagmiConfig,
} from "wagmi";
import { arbitrum, goerli, mainnet, optimism, polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import "../assets/css/global.css";
import { useEffect } from "react";
import LoginLayout from "@/components/loginLayout";
import { useRefreshToken } from "@/hooks/refreshToken";
import InstallVerificationBox from "../components/installVerificationBox";
import { useContext } from "react";
import { MyContext } from "../context/HeatmapProvider";
import App from "../components/App";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()]
);

let interval;

const { connectors } = getDefaultWallets({
  appName: "usersnaps",
  projectId: "c50d4c6f8d78fc37c6b4da20bd4a959c",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export default function _App({ Component, pageProps }) {
  const {
    accessToken,
    refreshToken,
    isNewUser,
    error,
    callRefreshToken,
    callLogOut,
  } = useRefreshToken();

  const router = useRouter();

  // jwt tokeni qoyulan muddetden bir refresh edir
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      callRefreshToken();
      clearInterval(interval);
      interval = setInterval(
        callRefreshToken,
        parseInt(process.env.NEXT_PUBLIC_REFRESH_ACCESS_TOKEN_TIME_DELAY)
      );

      return () => clearInterval(interval);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  });

  let componentWithLayout = null;

  switch (router?.pathname) {
    case "/login":
    case "/account/create":
    case "/code/install":
      componentWithLayout = (
        <>
          <LoginLayout>
            <Component {...pageProps} />
          </LoginLayout>
        </>
      );
      break;
    default:
      componentWithLayout = (
        <>
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        </>
      );
  }

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        modalSize="compact"
        theme={lightTheme({
          accentColor: "#303742",
          accentColorForeground: "white",
          overlayBlur: "small",
        })}
      >
        <HeatmapProvider>
          <App
            Component={Component}
            callLogOut={callLogOut}
            callRefreshToken={callRefreshToken}
            componentWithLayout={componentWithLayout}
            inter={inter}
          />
        </HeatmapProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
