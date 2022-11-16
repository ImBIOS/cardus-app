import MobileLayout from "components/layout/mobile-layout";
import dynamic from "next/dynamic";

const QRScanner = dynamic(() => import("components/ui/qr-scanner"), {
  ssr: false
});

const Scan: React.FC = () => {
  return (
    <MobileLayout>
      {/* TODO: Browser Unresponsive Problem */}
      {/* <QRScanner /> */}
      <h1 className="text-2xl font-medium">Under Construction 🏗️🚧</h1>
    </MobileLayout>
  );
};

export default Scan;
