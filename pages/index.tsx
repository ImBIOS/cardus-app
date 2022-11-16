import MobileLayout from "components/layout/mobile-layout";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import React from "react";

const BoxList = dynamic(() => import("components/ui/box/box-list"));

const Home: React.FC = () => {
  const { data: session } = useSession();

  return (
    <MobileLayout>
      {/* ALPHA */}
      {/* <SearchCardus /> */}
      {session ? <BoxList /> : <div>Please login first</div>}
      {/* <QuickButton /> */}
    </MobileLayout>
  );
};

export default Home;
