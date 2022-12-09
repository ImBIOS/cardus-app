import MobileLayout from "components/layouts/mobile-layout";
import QrReader from "components/qr-reader";

const Scan = () => {
  return (
    <MobileLayout>
      <div className="absolute top-0 h-screen w-screen">
        <QrReader />
      </div>
      {/* <h1 className="text-2xl font-medium">Under Construction 🏗️🚧</h1> */}
    </MobileLayout>
  );
};

export default Scan;
