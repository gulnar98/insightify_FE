import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Home page</title>
    </Head>
  );
}

export default Home;
