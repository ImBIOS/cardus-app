import MobileLayout from "components/layout/mobile-layout";
import PromptScreen from "components/screen/prompt/prompt-screen";
import BoxDisclosure from "components/ui/disclosure/box-disclosure";
import ImagePreview from "components/ui/image/image-preview";
import { useAtom } from "jotai";
import { boxIdAtom, isPrintAtom } from "lib/atoms";
import fetcher from "lib/fetcher";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

const Box: React.FC = () => {
  const router = useRouter();
  const { boxId } = router.query as unknown as any;

  const [_boxIdState, setBoxIdState] = useAtom(boxIdAtom);

  // Set global boxId state
  useEffect(() => {
    setBoxIdState(boxId);
  }, [boxId, setBoxIdState]);

  const { data, error } = useSWR(boxId ? `/api/box/${boxId}` : null, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <PromptScreen type="loading" />;

  const box = data;
  return (
    <MobileLayout>
      <section className="mx-auto mt-8 mb-0 flex w-[90%] max-w-4xl flex-col">
        {/* <!-- Header Dropdown --> */}
        <BoxDisclosure
          title={box.name}
          subtitle={box.location}
          images={box.images}
        />

        <section>
          <div className="mb-4 flex">
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

export default Box;
