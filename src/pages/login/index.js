import Head from "next/head";
import { useRouter } from "next/navigation";

import LoginWallet from "../../components/LoginWallet";

export default function Login() {
  const router = useRouter();

  const onSuccess = ({ isNewUser }) => {
    if (isNewUser) {
      router.push("/account/create");
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login page</title>
      </Head>

      <LoginWallet
        onSuccess={onSuccess}
        onFailure={(error) => {
          alert("Something went wrong. Try again!");
        }}
      />
    </>
  );
}
