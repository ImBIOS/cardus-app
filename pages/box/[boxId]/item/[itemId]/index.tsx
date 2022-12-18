import ImagePreview from "components/image/image-preview";
import MobileLayout from "components/layouts/mobile-layout";
import PromptScreen from "components/screens/prompt/prompt-screen";
import { useAtom } from "jotai";
import { boxIdAtom } from "lib/atoms";
import fetcher from "lib/fetcher";
import Image from "next/image";
import { useRouter } from "next/router";
import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";

const ItemId = () => {
  const router = useRouter();
  const [_, setBoxIdState] = useAtom(boxIdAtom);

  const [qr, setQR] = useState("");

  const { boxId } = router.query as unknown as any;
  const ref = useRef<HTMLDivElement>(null);

  // Set global boxId state
  useEffect(() => {
    setBoxIdState(boxId);
  }, [boxId, setBoxIdState]);

  // Set QR code
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

  const { data, error } = useSWR(boxId ? `/api/box/${boxId}` : null, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <PromptScreen type="loading" />;

  const box = data;
  return (
    <MobileLayout>
      <section className="mx-auto mt-8 mb-0 flex w-[90%] max-w-4xl flex-col">
        <section>
          <div className="mb-4 flex">
            {/* QR */}
            {qr && (
              <div className="mr-8" ref={ref}>
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
          </div>
          <div className="relative flex h-40 items-center justify-start overflow-x-auto overflow-y-clip bg-transparent">
            <ImagePreview images={box.images} readOnly />
          </div>
        </section>
        {box?.items?.map(
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
      </section>
    </MobileLayout>
  );
};

export default ItemId;
