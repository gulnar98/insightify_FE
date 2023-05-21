import DashboardLayout from "@/components/dashboardLayout";
import CreateAccount from "@/components/createAccount";
import AccountProvider from "@/context/AccountProvider";
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
import { MyContext } from "../context/AccountProvider";
import App from "../components/App";

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
  appName: "RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
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

  // jwt tokeni qoyulan muddetden bir refresh edir
  useEffect(() => {
    callRefreshToken();

    clearInterval(interval);
    interval = setInterval(
      callRefreshToken,
      parseInt(process.env.NEXT_PUBLIC_REFRESH_ACCESS_TOKEN_TIME_DELAY)
    );

    return () => clearInterval(interval);
  });

  let componentWithLayout = null;

  switch (Component.name) {
    case "Login":
    case "CreateAccountPage":
    case "CodeInstallPage":
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
        <AccountProvider>
          <App 
            Component={Component} 
            callLogOut={callLogOut} 
            callRefreshToken={callRefreshToken} 
            componentWithLayout={componentWithLayout}
            inter={inter}
          />
        </AccountProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
