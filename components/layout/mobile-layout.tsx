import PromptScreen from "components/screen/prompt/prompt-screen";
import BottomNav from "components/ui/nav/bottom-nav";
import TopNav from "components/ui/nav/top-nav";
import { useAtom } from "jotai";
import { isLoadingAtom, isMobileAtom } from "lib/atoms";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { ReactNode, useEffect } from "react";

type Props = {
  children?: ReactNode;
};

const MobileLayout = ({ children }: Props): JSX.Element => {
  const { status } = useSession({ required: true });
  const [isMobile, setIsMobile] = useAtom(isMobileAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

  useEffect(() => {
    setIsMobile(
      Math.min(window.screen.width, window.screen.height) < 768 ||
        navigator.userAgent.indexOf("Mobi") > -1
    );
  }, [setIsMobile]);

  useEffect(() => setIsLoading(status === "loading"), [setIsLoading, status]);

  if (isLoading) return <PromptScreen type="loading" />;
  if (!isMobile) return <PromptScreen type="notMobile" />;

  return (
    <>
      <Head>
        <title>Cardus</title>
      </Head>
      <TopNav />
      <main>{children}</main>
      <BottomNav />
    </>
  );
};

MobileLayout.auth = true;

export default MobileLayout;
