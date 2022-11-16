import { CheckIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import { bottomNavAtom, isWaitingUploadAtom, topNavAtom } from "configs/atoms";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useMemo } from "react";
import Hamburger from "./hamburger";

const TopNav = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [{ currentScreen }] = useAtom(bottomNavAtom);
  const [{ submitAction }] = useAtom(topNavAtom);
  const [isWaiting] = useAtom(isWaitingUploadAtom);

  const isBoxScreen = useMemo(
    () => currentScreen.includes("box"),
    [currentScreen]
  );
  const isFormScreen = useMemo(
    () => ["add box", "edit box"].includes(currentScreen),
    [currentScreen]
  );

  return (
    <section className="sticky top-0 z-10 flex justify-between bg-white px-4 pt-6 pb-2 dark:bg-neutral-900">
      <div className="flex items-center justify-start">
        {/* <!-- Hamburger --> */}
        {currentScreen === "home" && <Hamburger />}
        {/* <!-- Back Button --> */}
        {isBoxScreen && (
          <ChevronLeftIcon
            className="h-10 w-10"
            onClick={() => router.back()}
          />
        )}
        <h1 className="ml-4 text-3xl font-bold capitalize">
          {session ? currentScreen : "Login"}
        </h1>
      </div>

      {isFormScreen && (
        <button
          onClick={submitAction}
          disabled={isWaiting}
          className={`disabled:cursor-not-allowed disabled:opacity-50 ${
            !isWaiting &&
            "transition-all duration-150 ease-in-out active:scale-90"
          }`}
        >
          <CheckIcon className="mr-4 h-10 w-10" />
        </button>
      )}
    </section>
  );
};

export default TopNav;
