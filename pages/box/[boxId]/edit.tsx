import MobileLayout from "components/layouts/mobile-layout";
import fetcher from "lib/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";

const EditBox = () => {
  const router = useRouter();
  const { boxId } = router.query;

  const { data, error, isLoading } = useSWR(
    boxId ? `/api/box/${boxId}` : null,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return <MobileLayout>{data.name}</MobileLayout>;
};

export default EditBox;
