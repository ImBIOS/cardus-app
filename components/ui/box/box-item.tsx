import Link from "next/link";
import BoxItemImages from "./box-item-images";

type Props = {
  itemData: {
    id: string;
    fields: {
      name: string;
      location: string;
      items: any[];
      attachments: {
        url: string;
      }[];
    };
  };
};

const BoxItem = ({ itemData }: Props) => {
  const { id, fields } = itemData;
  return (
    <Link
      href={`/box/${id}`}
      className="flex h-24 w-[48%] items-center rounded-lg bg-neutral-100 py-2 text-left hover:text-blue-600 focus:text-blue-600 dark:bg-neutral-800"
    >
      <div className="mx-4 my-2 flex items-center">
        <div className="relative mr-4 flex items-center">
          <BoxItemImages images={fields.attachments} />
        </div>
        <div>
          <h3 className="overflow-hidden text-ellipsis text-2xl font-bold">
            {fields.name}
          </h3>
          <p className="mt-2 w-14 overflow-hidden text-ellipsis text-sm">
            {fields.items.length} item{fields.items.length > 1 ? "s" : ""}
          </p>
          <p className="overflow-hidden text-ellipsis text-neutral-400">
            {fields.location}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BoxItem;
