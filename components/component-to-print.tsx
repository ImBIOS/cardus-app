import { useAtom } from "jotai";
import { componentToPrintAtom } from "lib/atoms";
import Image from "next/image";
import { useEffect, useRef } from "react";
import ImagePreview from "./image/image-preview";

type Prop = {
  qr: string;
};

const ComponentToPrint = ({ qr }: Prop) => {
  const componentToPrintRef = useRef<HTMLDivElement>(null);
  const [_, setComponentToPrint] = useAtom(componentToPrintAtom);

  // Set component to print
  useEffect(() => {
    setComponentToPrint(componentToPrintRef);
  }, [setComponentToPrint]);

  return (
    <div
      className="mr-8 flex"
      ref={componentToPrintRef}
      onLoad={() => setComponentToPrint(componentToPrintRef)}
    >
      <Image
        src={qr}
        width={192}
        height={192}
        alt="qr code"
        className="rounded-md border-2 border-dashed border-sky-500 p-2"
      />
      <div>
        <span>To help identify the box,here is the box image(s)</span>
        <ImagePreview readOnly />
      </div>
    </div>
  );
};

export default ComponentToPrint;
