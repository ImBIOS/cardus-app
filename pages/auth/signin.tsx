import AuthLayout from "components/layout/auth-layout";
import { GetServerSideProps } from "next";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn
} from "next-auth/react";

type Props = {
  providers: ReturnType<typeof getProviders>;
};

const Signin = ({ providers }: Props) => {
  return (
    <AuthLayout>
      <section className="z-0 flex h-[80vh]">
        {Object.values(providers).map((provider) => (
          <button
            key={provider.name}
            className="m-auto rounded-full bg-blue-400 px-4 py-2 font-semibold"
            onClick={() => signIn(provider.id)}
          >
            Sign In with {provider.name}
          </button>
        ))}
      </section>
    </AuthLayout>
  );
};

export default Signin;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/", permanent: false }
    };
  }

  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);

  return {
    props: { providers, csrfToken }
  };
};
