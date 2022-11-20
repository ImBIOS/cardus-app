import MobileLayout from "components/layout/mobile-layout";
import PromptScreen from "components/screen/prompt/prompt-screen";
import AttachmentElement from "components/ui/attachment/attachment-element";
import { boxIdAtom, isPrintAtom } from "configs/atoms";
import { useAtom } from "jotai";
import Image from "next/image";
import { useRouter } from "next/router";
import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";

const Storage: React.FC = () => {
  const router = useRouter();
  const [isPrint] = useAtom(isPrintAtom);
  const [_, setBoxIdState] = useAtom(boxIdAtom);

  const [qr, setQR] = useState("");

  const { boxId } = router.query as unknown as any;
  const ref: any = useRef();

  // Set global boxId state
  useEffect(() => {
    setBoxIdState(boxId);
  }, [boxId, setBoxIdState]);

  useEffect(() => {
    if (boxId) {
      const fullURL = router.basePath + router.asPath;
      QRCode.toDataURL(fullURL)
        .then((url) => {
          setQR(url);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [boxId, router.asPath, router.basePath]);

  const fetcher = (url: RequestInfo) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(boxId ? `/api/box/${boxId}` : null, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <PromptScreen type="loading" />;

  const box = data.res;
  return (
    <MobileLayout>
      <section className="mx-auto mt-8 mb-0 flex w-[90%] max-w-4xl flex-col">
        <header className="mb-4 flex">
          {/* QR */}
          {qr && (
            <div className={`mr-8 ${!isPrint && "hidden"}`} ref={ref}>
              <Image
                src={qr}
                width={192}
                height={192}
                alt="qr code"
                className="rounded-md"
              />
            </div>
          )}
          <div>
            <input
              className="w-full cursor-default border-0 bg-transparent text-4xl  font-semibold leading-3 outline-none"
              type="text"
              name="name"
              autoComplete="off"
              placeholder="Storage Name"
              defaultValue={box.name || ""}
              readOnly
            />
            <input
              className="mt-2 w-full cursor-default border-0 bg-transparent py-2 px-0 font-light outline-none"
              placeholder="Storage Location"
              defaultValue={box.location || ""}
              name="place"
              type="text"
              autoComplete="off"
              readOnly
            />
          </div>
        </header>
        {box.items.map(
          (
            item: { name: string | number | readonly string[] | undefined },
            index: string | number
          ) => (
            <input
              key={`item-${index}`}
              name="items"
              defaultValue={item.name}
              placeholder="Item Name"
              readOnly
              className="bg-transparent py-4 px-0 text-lg outline-none"
            />
          )
        )}

        <div className="relative flex h-40 items-center justify-start overflow-x-auto overflow-y-clip bg-transparent">
          <AttachmentElement box={box} readOnly />
        </div>
      </section>
    </MobileLayout>
  );
};

export default Storage;
