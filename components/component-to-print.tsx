import { useAtom } from "jotai";
import { componentToPrintAtom } from "lib/atoms";
import Image from "next/image";
import { useEffect, useRef } from "react";

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
      <Image
        src={qr}
        width={192}
        height={192}
        alt="qr code"
        className="rounded-md border-2 border-dashed border-sky-500 p-2"
      />
      <Image
        src={qr}
        width={192}
        height={192}
        alt="qr code"
        className="rounded-md border-2 border-dashed border-sky-500 p-2"
      />
      <Image
        src={qr}
        width={192}
        height={192}
        alt="qr code"
        className="rounded-md border-2 border-dashed border-sky-500 p-2"
      />
    </div>
  );
};

export default ComponentToPrint;
