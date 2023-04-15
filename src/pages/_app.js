import DashboardLayout from "@/components/dashboardLayout";
import "../assets/css/reset.css";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    </main>
  );
}
