import AuthLayout from "components/layout/auth-layout";
import { GetServerSideProps } from "next";
import {
  ClientSafeProvider,
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";

type Props = {
  providers: ReturnType<typeof getProviders>;
};

const Signin = ({ providers }: Props) => {
  // Background color for each OAuth Provider
  const providerColors = {
    Google: "bg-red-500",
    GitHub: "bg-gray-900",
  };

  return (
    <AuthLayout>
      <section className="flex h-[80vh] flex-col justify-center gap-8">
        {Object.values(providers).map((provider: ClientSafeProvider) => (
          <button
            key={provider.name}
            className={`mx-8 rounded-full px-4 py-2 font-semibold text-white ${
              providerColors[provider.name as keyof typeof providerColors]
            }`}
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
      redirect: { destination: "/", permanent: false },
    };
  }

  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);

  return {
    props: { providers, csrfToken },
  };
};
