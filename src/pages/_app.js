import DashboardLayout from "@/components/dashboardLayout";
import "../assets/css/reset.css";
import "../assets/css/global.css";

import { Inter } from "next/font/google";
import { useEffect } from "react";
import LoginLayout from "@/components/loginLayout";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  useEffect(() => {
    document.body.className = pageProps.isLogin ? "login" : "dashboard";
  });

  return (
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
  );
}
