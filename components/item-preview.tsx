import Link from "next/link";
import InputField from "./form/input-field";
import ImagePreview from "./image/image-preview";

export interface IItemPreview {
  id: string;
  title?: string;
  subtitle?: string;
  images?: string[];
}

type Props = {
  item: IItemPreview;
};

const ItemPreview = ({ item }: Props) => {
  const { id, title, subtitle, images } = item;

  return (
    <Link href={`/item/${id}`}>
      <div className="flex h-72 w-full flex-col justify-between rounded-lg bg-neutral-100 px-4 py-2 text-left text-sm font-medium text-neutral-900 transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75 dark:bg-neutral-800 dark:text-neutral-200">
        <div className="flex items-center">
          <div className="del flex w-[90%] flex-col-reverse gap-4 transition-all delay-500 duration-500 ease-in-out">
            <div className="w-[90%] overflow-x-auto">
              <ImagePreview images={images} readOnly />
            </div>
            <div>
              <InputField flavour="title" defaultValue={title} readOnly />
              <InputField flavour="subtitle" defaultValue={subtitle} readOnly />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemPreview;
