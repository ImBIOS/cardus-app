import TopNav from "components/nav/top-nav";
import OnboardingScreen from "components/screens/onboarding";
import PromptScreen from "components/screens/prompt/prompt-screen";
import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";

type Props = {
  children?: ReactNode;
  title?: string;
};

const AuthLayout = ({ children }: Props) => {
  const [mounted, setMounted] = useState(false);
  const [isOnboarding, setIsOnboarding] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isViewedOnboarding =
      localStorage.getItem("viewedOnboarding")?.toLowerCase() === "true";
    setIsOnboarding(isViewedOnboarding);
  }, []);

  if (!mounted) return <PromptScreen type="loading" />;
  if (!isOnboarding) return <OnboardingScreen />;
  return (
    <>
      <Head>
        <title>Auth - Cardus</title>
      </Head>
      <TopNav />
      <main className="mx-4">{children}</main>
      {/* <BottomNav /> */}
    </>
  );
};

export default AuthLayout;
