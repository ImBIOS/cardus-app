import { HomeIcon } from "@heroicons/react/24/solid";
import { bottomNavAtom } from "configs/atoms";
import { useAtom } from "jotai";
import Link from "next/link";

const LeftNav = () => {
  const [{ currentScreen }] = useAtom(bottomNavAtom);

  return (
    <Link href="/">
      <HomeIcon
        className={`h-10 w-10 ${currentScreen === "home" && "text-blue-400"}`}
      />
    </Link>
  );
};

export default LeftNav;
