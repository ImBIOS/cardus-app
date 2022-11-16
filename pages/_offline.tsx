import MobileLayout from "components/layout/mobile-layout";
import BoxList from "components/ui/box/box-list";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <MobileLayout>
      {/* ALPHA */}
      {/* <SearchCardus /> */}
      {session ? <BoxList /> : <div>Please login first</div>}
      {/* <QuickButton /> */}
    </MobileLayout>
  );
}
