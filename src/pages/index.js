import NavItem from "@/components/Navigation/NavItem";
import NavList from "@/components/Navigation/NavList";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Home page</title>
      </Head>

      <NavList>
        <NavItem label={"dashboard"} />
        <NavItem label={"dashboard"} isActive />
        <NavItem label={"dashboard"} />
        <NavItem label={"dashboard"} />
      </NavList>
    </>
  );
}
