import MobileLayout from "components/layout/mobile-layout";
import dynamic from "next/dynamic";
import React from "react";

const BoxList = dynamic(() => import("components/ui/box/box-list"));

const Home: React.FC = () => {
  return (
    <MobileLayout>
      {/* ALPHA */}
      {/* <SearchCardus /> */}
      <BoxList />
      {/* <QuickButton /> */}
    </MobileLayout>
  );
};

export default Home;
