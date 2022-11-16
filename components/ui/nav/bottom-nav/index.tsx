import { bottomNavAtom } from "configs/atoms";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LeftNav from "./left-nav";
import MiddleNav from "./middle-nav";
import RightNav from "./right-nav";

type Props = {
  className?: string;
  hide?: boolean;
};

const BottomNav = ({ className, hide, ...props }: Props) => {
  const router = useRouter();
  const [_, setNav] = useAtom(bottomNavAtom);

  // Update currentScreen
  useEffect(() => {
    const currentPath = router.pathname.split("/");
    let screenName = "home";

    // Clean up the path name
    if (currentPath.length > 1 && currentPath[1] !== "") {
      const reversedCurrentPath = currentPath
        .reverse()
        // Clean pathname from id string
        .filter((path) => !path.includes("["));
      screenName = reversedCurrentPath.join(" ").trim();
    }

    // Update the current screen state when the route changes
    setNav({ currentScreen: screenName });
  }, [router.pathname, setNav]);

  return (
    <div
      className={`fixed bottom-0 flex h-24 w-full items-center justify-around rounded-t-[50px] bg-neutral-800 ${
        hide && "hidden"
      } ${className}`}
      {...props}
    >
      <LeftNav />
      <MiddleNav />
      <RightNav />
    </div>
  );
};

export default BottomNav;
