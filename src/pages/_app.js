import DashboardLayout from "@/components/dashboardLayout";
import "../assets/css/reset.css";
import { Inter } from "next/font/google";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { arbitrum, goerli, mainnet, optimism, polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import "../assets/css/global.css";
import { useEffect } from "react";
import LoginLayout from "@/components/loginLayout";

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

async function refreshToken () {
  return await fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      action: 'refresh'
    })
  });
}

export default function App({ Component, pageProps }) {
  useEffect(() => {
    document.body.className = pageProps.isLogin ? "login" : "dashboard";
  }, [pageProps.isLogin]);

  useEffect(() => {
    refreshToken();
    clearInterval(interval);
    interval = setInterval(() => {
      refreshToken();
    }, parseInt(process.env.NEXT_PUBLIC_REFRESH_ACCESS_TOKEN_TIME_DELAY));

    return () => clearInterval(interval);
  }, []);

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
        <main className={inter.className}>
          {pageProps.isLogin ? (
            <LoginLayout>
              <Component {...pageProps} />
            </LoginLayout>
          ) : (
            <DashboardLayout>
              <Component {...pageProps} />
            </DashboardLayout>
          )}
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
