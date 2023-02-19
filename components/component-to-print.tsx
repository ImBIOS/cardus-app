import { useAtom } from "jotai";
import { componentToPrintAtom } from "lib/atoms";
import Image from "next/image";
import { useEffect, useRef } from "react";

export interface IBulkQr {
  name: string;
  base64: string;
}

type Prop = {
  qr: string | IBulkQr[];
};

const ComponentToPrint = ({ qr }: Prop) => {
  const componentToPrintRef = useRef<HTMLDivElement>(null);
  const [_, setComponentToPrint] = useAtom(componentToPrintAtom);

  // Set component to print
  useEffect(() => {
    setComponentToPrint(componentToPrintRef);
  }, [setComponentToPrint]);

  if (typeof qr === "string")
    return (
      <div
        className="mr-8 flex"
        ref={componentToPrintRef}
        onLoad={() => setComponentToPrint(componentToPrintRef)}
      >
        {Array.from({ length: 4 }, (_, i) => (
          <Image
            key={`qr-${i + 1}`}
            src={qr}
            width={192}
            height={192}
            alt={`qr code single ${i + 1}`}
            className="rounded-md border-2 border-dashed border-sky-500 p-2"
          />
        ))}
      </div>
    );

  if (Array.isArray(qr))
    return (
      <div ref={componentToPrintRef}>
        {qr.map(({ name, base64 }, i) => (
          <div
            key={`qr-bulk-${i}`}
            className="mr-8 flex"
            onLoad={() => setComponentToPrint(componentToPrintRef)}
          >
            <div className="flex flex-col items-center">
              <p className="text-sm font-semibold">{name}</p>
            </div>
            {Array.from({ length: 4 }, (_, j) => (
              <Image
                key={`qr-${j + 1}`}
                src={base64}
                width={192}
                height={192}
                alt={`qr code bulk ${j + 1}`}
                className="rounded-md border-2 border-dashed border-sky-500 p-2"
              />
            ))}
          </div>
        ))}
      </div>
    );

  return <div ref={componentToPrintRef}>❌ Nothing to Print</div>;
};

export default ComponentToPrint;
