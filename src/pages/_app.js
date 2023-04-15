import Layout from "@/components/layout";
import "../assets/css/reset.css";
// import "../assets/css/global.css";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}
