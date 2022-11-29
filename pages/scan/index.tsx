import MobileLayout from "components/layout/mobile-layout";
import QrReader from "components/ui/qr-reader";

const Scan = () => {
  return (
    <MobileLayout>
      <div className="absolute top-0 h-screen w-screen">
        <QrReader className="h-screen w-screen bg-cover" />
      </div>
      {/* <h1 className="text-2xl font-medium">Under Construction 🏗️🚧</h1> */}
    </MobileLayout>
  );
};

export default Scan;
