import MobileLayout from "components/layout/mobile-layout";
import PromptScreen from "components/screen/prompt/prompt-screen";
import ImageSkeleton from "components/ui/image-skeleton";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";

const Storage: React.FC = () => {
  const router = useRouter();
  const [qr, setQR] = useState("");
  const [isPrint, setIsPrint] = useState(false);
  const [imageLoaded, setImageLoaded] = useState<boolean[]>([]);

  const { boxId } = router.query as unknown as any;
  const ref: any = useRef();

  const generatePDF = () => {
    setIsPrint(true);
    // Wait for re-render to finish
    const print = setInterval(() => {
      window?.print();
      setIsPrint(false);
      clearInterval(print);
    }, 1);
  };

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
  });

  const deleteData = async (data: { id: string; attachments: any }) => {
    try {
      const res = await fetch(`/api/box/${data.id}`, {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });
      const record = await res.json();
      return record.id;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setImageLoaded((prev) => [...prev, false]);
  }, []);

  const fetcher = (url: RequestInfo) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(boxId ? `/api/box/${boxId}` : null, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <PromptScreen type="loading" />;

  const box = data.res;
  return (
    <MobileLayout>
      <section className="mx-auto mt-8 mb-0 flex w-[90%] max-w-4xl flex-col lg:mt-32">
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
              className="w-full cursor-default border-0 bg-transparent text-4xl  font-semibold leading-3 outline-none lg:text-6xl"
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
              className="bg-transparent py-4 px-0 text-lg outline-none lg:text-2xl"
            />
          )
        )}

        <div className="relative flex h-40 items-center justify-start overflow-x-auto overflow-y-clip bg-transparent">
          {box.attachments.map(({ url }: { url: string }, idx: number) => (
            <div key={url} className="relative mx-1 h-40 w-28">
              {!imageLoaded[idx] && <ImageSkeleton />}
              <Image
                fill
                sizes="100%"
                src={url}
                onLoad={() => setImageLoaded([...imageLoaded])}
                alt=""
                className="rounded-lg object-cover hover:cursor-pointer"
              />
            </div>
          ))}
        </div>
        <div className={`mt-4 ${isPrint && "hidden"}`}>
          <Link href={`/box/${boxId}/edit`} passHref>
            <button
              className="cursor-pointer rounded-md border-0 bg-transparent py-3 px-2 text-lg font-semibold"
              type="button"
            >
              Edit Note
            </button>
          </Link>
          <Link href="/" passHref>
            <button
              className="ml-4 cursor-pointer rounded-md border-0 bg-transparent py-3 px-2 text-lg font-semibold text-red-500"
              type="button"
            >
              Back
            </button>
          </Link>
          <button
            className="ml-4 cursor-pointer rounded-md border-0 bg-transparent py-3 px-2 text-lg font-semibold text-red-500"
            type="button"
            onClick={() =>
              deleteData({ id: boxId, attachments: box.attachments }).then(
                () => {
                  router.replace(`/`);
                }
              )
            }
          >
            Delete
          </button>
          <button
            className="ml-4 cursor-pointer rounded-md border-0 bg-transparent py-3 px-2 text-lg font-semibold text-yellow-500"
            type="button"
            onClick={generatePDF}
          >
            Print
          </button>
          {/* <GeneratePDF html={ref} /> */}
        </div>
      </section>
    </MobileLayout>
  );
};

export default Storage;
