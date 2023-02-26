import fetcher from "lib/fetcher";
import Link from "next/link";
import useSWR from "swr";
import BoxItem, { IBoxItem } from "./box-item";

const BoxList: React.FC = () => {
  const { data, error, isLoading } = useSWR("/api/boxes", fetcher);

  if (error || !data || data?.length === 0)
    return (
      <section className="no-scrollbar mb-48 flex h-[36rem] flex-col flex-wrap items-center justify-center gap-2 overflow-y-clip text-center">
        {error && <>🥹 failed to load</>}
        {isLoading && <>📦 Loading boxes...</>}
        {data?.length === 0 && (
          <>
            🤔 No box created yet.
            <br />
            create one 📦 by
            <br />
            <span className="flex items-center">
              tap the
              <Link
                href="/box/add"
                className="mx-2 h-7 rounded-full bg-blue-600 p-1 text-3xl leading-3"
              >
                <b>+</b>
              </Link>
              button
            </span>
          </>
        )}
      </section>
    );

  return (
    <section className="no-scrollbar mb-72 flex flex-row flex-wrap gap-2 overflow-y-clip">
      {data.map((box: IBoxItem, idx: number) => (
        <BoxItem key={`storageItem-${idx}`} box={box} />
      ))}
    </section>
  );
};

export default BoxList;
