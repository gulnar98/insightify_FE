import { 
  WagmiConfig, 
  createClient, 
  configureChains, 
  mainnet, 
  goerli
} from "wagmi";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { Profile } from "./Profile";

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: "dgLZn3k5KXjNWxXH9iHEGJBcid9cTBY9" })]
);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains
      // options: {
      //   appName: "wagmi",
      // },
    }),
    // new WalletConnectConnector({
    //   chains,
    //   // options: {
    //   //   projectId: "...",
    //   // },
    // }),
  ],
  provider,
  webSocketProvider,
});

// Pass client to React Context Provider
export default function Login() {
  return (
    <WagmiConfig client={client}>
      <Profile />
    </WagmiConfig>
  );
}
