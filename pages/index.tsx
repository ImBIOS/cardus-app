import BoxList from "components/box/box-list";
import MobileLayout from "components/layouts/mobile-layout";
import QuickButton from "components/quick-button";

const Home = () => {
  return (
    <MobileLayout>
      {/* ALPHA */}
      {/* <SearchCardus /> */}
      <section className="mx-4 my-2">
        <BoxList />
      </section>
      <QuickButton />
    </MobileLayout>
  );
};

export default Home;
