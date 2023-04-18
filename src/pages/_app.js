import DashboardLayout from "@/components/dashboardLayout";
import "../assets/css/reset.css";
import { Inter } from "next/font/google";
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { arbitrum, goerli, mainnet, optimism, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const inter = Inter({ subsets: ["latin"] });

const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} modalSize='compact' theme={lightTheme({
      accentColor: '#303742',
      accentColorForeground: 'white',
      overlayBlur: 'small',
    })}>
      <main className={inter.className}>
        {/* <DashboardLayout> */}
          <Component {...pageProps} />
        {/* </DashboardLayout> */}
      </main>
    </RainbowKitProvider>
    </WagmiConfig>
  );
}
