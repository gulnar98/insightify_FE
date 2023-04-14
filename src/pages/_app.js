import "../assets/css/reset.css";

import { Inter } from "next/font/google";
import Test from "./test";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      {/* <Test> */}
        <Component {...pageProps} />
      {/* </Test> */}
    </main>
  );
}
