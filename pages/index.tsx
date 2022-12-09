import BoxList from "components/box/box-list";
import MobileLayout from "components/layouts/mobile-layout";
import QuickButton from "components/quick-button";

const Home = () => {
  return (
    <MobileLayout>
      {/* ALPHA */}
      {/* <SearchCardus /> */}
      <div className="mx-4 my-2">
        <BoxList />
      </div>
      <QuickButton />
    </MobileLayout>
  );
};

export default Home;
