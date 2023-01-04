import Button from "components/button";
import BoxDisclosure from "components/disclosure/box-disclosure";
import ItemPreview, { IItemPreview } from "components/item-preview";
import MobileLayout from "components/layouts/mobile-layout";
import PromptScreen from "components/screens/prompt/prompt-screen";
import { useAtom } from "jotai";
import { boxIdAtom } from "lib/atoms";
import fetcher from "lib/fetcher";
import Link from "next/link";
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
          className="mb-4"
        />

        {/* <!-- Items --> */}
        {box?.items.length > 0 ? (
          box.items.map((item: IItemPreview) => (
            <ItemPreview key={item.id} item={item} />
          ))
        ) : (
          <div className="mt-12 flex h-full justify-center">
            <Link href={`/box/${boxId}/item/add`} passHref>
              <Button>Add Item</Button>
            </Link>
          </div>
        )}
      </section>
    </MobileLayout>
  );
};

export default Box;
