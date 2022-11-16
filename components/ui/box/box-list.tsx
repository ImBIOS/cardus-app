import Link from "next/link";
import useSWR from "swr";
import BoxItem from "./box-item";

const BoxList: React.FC = () => {
  const fetcher = (url: RequestInfo) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR("/api/boxes", fetcher);

  if (error || !data || data?.res?.length === 0)
    return (
      <section className="-mt-24 flex h-screen flex-col items-center justify-center text-center">
        {error && <>🥹 failed to load</>}
        {!data && <>📦 Loading boxes...</>}
        {data?.res?.length === 0 && (
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
    <section className="no-scrollbar mb-36 flex flex-row flex-wrap gap-2 overflow-y-auto">
      {data.res.map((itemData: any, idx: number) => (
        <BoxItem key={`storageItem-${idx}`} itemData={itemData} />
      ))}
    </section>
  );
};

export default BoxList;
