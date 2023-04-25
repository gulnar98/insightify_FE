import DashboardLayout from "@/components/dashboardLayout";
import "../assets/css/reset.css";
import { Inter } from "next/font/google";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, useAccount, useSignMessage, WagmiConfig } from "wagmi";
import { arbitrum, goerli, mainnet, optimism, polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import "../assets/css/global.css";
import { useEffect } from "react";
import LoginLayout from "@/components/loginLayout";
import { useRefreshToken } from "@/hooks/refreshToken";

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

export default function App({ Component, pageProps }) {
  const {
    accessToken,
    refreshToken,
    isNewUser,
    error,
    callRefreshToken,
    callLogOut
  } = useRefreshToken();

  useEffect(() => {
    callRefreshToken();

    clearInterval(interval);
    interval = setInterval(callRefreshToken, parseInt(process.env.NEXT_PUBLIC_REFRESH_ACCESS_TOKEN_TIME_DELAY));

    return () => clearInterval(interval);
  });

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
        {(() => {
          const { isConnected, isDisconnected } = useAccount();

          useEffect(() => {
            document.body.className = !isConnected || !accessToken ? "login" : "dashboard";
          }, [isConnected, accessToken]);

          useEffect(() => {
            if (isDisconnected) {
              callLogOut().then(callRefreshToken);
            }
          }, [isDisconnected]);

          const props = {...pageProps, isNewUser};

          return (
            <>
              <main className={inter.className}>
                {!isConnected || !accessToken ? (
                  <LoginLayout>
                    <Component {...props} />
                  </LoginLayout>
                ) : isNewUser ? (
                  <LoginLayout>
                    <h1>Burada signup addimlar olmalidir</h1>
                  </LoginLayout>
                ) : (
                  <DashboardLayout>
                    <Component {...props} />
                  </DashboardLayout>
                )}
              </main>
            </>
          );
        })()}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
