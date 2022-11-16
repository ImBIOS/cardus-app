import PromptScreen from "components/screen/prompt/prompt-screen";
import BottomNav from "components/ui/nav/bottom-nav";
import TopNav from "components/ui/nav/top-nav";
import { isMobileAtom } from "configs/atoms";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { ReactNode, useEffect } from "react";

type Props = {
  children?: ReactNode;
  hideBottomNav?: boolean;
};

const MobileLayout = ({ children, hideBottomNav }: Props): JSX.Element => {
  const { status } = useSession({ required: true });
  const [isMobile, setIsMobile] = useAtom(isMobileAtom);

  useEffect(() => {
    setIsMobile(
      Math.min(window.screen.width, window.screen.height) < 768 ||
        navigator.userAgent.indexOf("Mobi") > -1
    );
  }, [setIsMobile]);

  if (status === "loading") return <PromptScreen type="loading" />;
  if (!isMobile) return <PromptScreen type="notMobile" />;

  return (
    <>
      <Head>
        <title>Cardus</title>
      </Head>
      <TopNav />
      <main className="mx-4 my-2">{children}</main>
      <BottomNav hide={hideBottomNav} />
    </>
  );
};

MobileLayout.auth = true;

export default MobileLayout;
