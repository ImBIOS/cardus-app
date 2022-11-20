import { CheckIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import {
  bottomNavAtom,
  isPrintAtom,
  isWaitingUploadAtom,
  topNavAtom
} from "configs/atoms";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useMemo } from "react";
import TopLeft from "./top-left";

const TopNav = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isPrint] = useAtom(isPrintAtom);
  const [isWaiting] = useAtom(isWaitingUploadAtom);
  const [{ currentScreen }] = useAtom(bottomNavAtom);
  const [{ submitAction }] = useAtom(topNavAtom);

  const isBoxScreen = useMemo(
    () => currentScreen.includes("box"),
    [currentScreen]
  );

  const isFormScreen = useMemo(
    () => ["add box", "edit box"].includes(currentScreen),
    [currentScreen]
  );

  return (
    <section
      className={`sticky top-0 z-10 flex justify-between border-b border-gray-800 bg-neutral-900 bg-opacity-30 p-4 pt-6 backdrop-blur-lg backdrop-filter ${
        isPrint && "hidden"
      }`}
    >
      <div className="flex items-center justify-start">
        {/* <!-- Hamburger --> */}
        {currentScreen === "home" && <TopLeft />}

        {/* <!-- Back Button --> */}
        {isBoxScreen && (
          <ChevronLeftIcon
            className="h-10 w-10"
            onClick={() => router.push("/")}
          />
        )}
        <h1 className="ml-4 text-3xl font-bold capitalize">
          {session ? currentScreen : "Login"}
        </h1>
      </div>

      {/* <!-- Submit Button --> */}
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
