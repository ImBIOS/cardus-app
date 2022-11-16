import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";

const QRScanner = () => {
  const router = useRouter();
  const [scanResult, setScanResult] = useState("");

  useEffect(() => {
    if (scanResult) {
      router.push(scanResult);
    }

    return () => {
      setScanResult("");
    };
  }, [router, scanResult]);

  return (
    <QrReader
      onResult={(result, error) => {
        if (!!result) {
          const text = result.getText();
          setScanResult(text);
        }

        if (!!error) {
          console.error("QR Error");
          console.error(error);
        }
      }}
      // this is facing mode : "environment " it will open
      // backcamera of the smartphone and if not found will
      // open the front camera
      constraints={{ facingMode: "environment" }}
      videoStyle={{ width: "100%", height: "100%" }}
      videoContainerStyle={{ width: "100%", height: "100%" }}
      containerStyle={{ width: "100%", height: "100%" }}
      // className="h-screen w-screen"
    />
  );
};

export default QRScanner;
