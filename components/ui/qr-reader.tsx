import QrScanner from "qr-scanner";
import { useEffect, useRef } from "react";

type Prop = {} & React.HTMLAttributes<HTMLVideoElement>;

const QrReader = ({ ...props }: Prop) => {
  const overlayElem = useRef<HTMLDivElement>(null);
  const overlaySvgElem = useRef<SVGSVGElement>(null);
  const videoElem = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let scanner: QrScanner | null = new QrScanner(
      videoElem.current as HTMLVideoElement,
      (result) => console.log("decoded qr code:", result),
      {
        onDecodeError: (error) => {
          console.info(error);
        },
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: overlayElem.current as HTMLDivElement
      }
    );

    const updateFlashAvailability = () => {
      scanner?.hasFlash().then((hasFlash) => {
        console.info("has flash", hasFlash);
      });
    };

    scanner.start().then(() => {
      overlayElem.current?.classList.add("scan-region-highlight-custom");
      overlaySvgElem.current?.classList.add("scan-region-highlight-svg-custom");
      updateFlashAvailability();
      // List cameras after the scanner started to avoid listCamera's stream and the scanner's stream being requested
      // at the same time which can result in listCamera's unconstrained stream also being offered to the scanner.
      // Note that we can also start the scanner after listCameras, we just have it this way around in the demo to
      // start the scanner earlier.
      QrScanner.listCameras(true).then((cameras) =>
        cameras.forEach((camera) => {
          console.info("camera", camera);
        })
      );
    });

    QrScanner.hasCamera().then((hasCamera) =>
      console.info("has camera", hasCamera)
    );

    return () => {
      scanner?.stop();
      scanner?.destroy();
      scanner = null;
    };
  }, []);

  return (
    <>
      <video ref={videoElem} {...props} />
      <div ref={overlayElem} className="scan-region-highlight">
        <svg
          ref={overlaySvgElem}
          className="scan-region-highlight-svg"
          viewBox="0 0 238 238"
          preserveAspectRatio="none"
        >
          <path d="M31 2H10a8 8 0 0 0-8 8v21M207 2h21a8 8 0 0 1 8 8v21m0 176v21a8 8 0 0 1-8 8h-21m-176 0H10a8 8 0 0 1-8-8v-21"></path>
        </svg>
      </div>
      <style>
        {`
          .scan-region-highlight-custom {
            position: absolute !important;
            pointer-events: none !important;
            transform: scaleX(-1) !important;
            width: 50vw !important;
            height: 50vw !important;
            top: 30% !important;
            left: 25% !important;
          }

          .scan-region-highlight-custom .scan-region-highlight-svg-custom {
            position: absolute !important;
            width: 50vw !important;
            height: 50vw !important;
            left: 0 !important;
            top: 0 !important;
            fill: none !important;
            stroke: #60a5fa !important;
            stroke-width: 4 !important;
            stroke-linecap: round !important;
            stroke-linejoin: round !important;
          }

          .scan-region-highlight-custom .code-outline-highlight {
            position: absolute !important;
            width: 150vw !important;
            height: 150vw !important;
            stroke: #3b82f6 !important;
            top: -30vw !important;
            left: -50vw !important;
          }
        `}
      </style>
    </>
  );
};

export default QrReader;
