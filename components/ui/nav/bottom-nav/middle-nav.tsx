import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/solid";
import AddAttachment from "components/ui/attachment/add-attcahment";
import {
  bottomNavAtom,
  boxIdAtom,
  isHideCreateBoxAtom,
  midBottomNavAtom
} from "configs/atoms";
import { useAtom } from "jotai";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type Props = {
  className?: string;
};

const MiddleNav = ({ className }: Props) => {
  const [boxId] = useAtom(boxIdAtom);
  const [{ currentScreen, midButtonAction }] = useAtom(bottomNavAtom);
  const [midButton, setMidButton] = useAtom(midBottomNavAtom);
  const [_, setIsHideCreateBox] = useAtom(isHideCreateBoxAtom);

  const [isSleepDone, setIsAnimating] = useState(midButton.isAnimating);
  const [midButtonAnimation, setMidButtonAnimation] = useState(
    midButton.animation
  );

  const isMidIconRotating = useCallback(() => {
    const time = 400;
    const start = setTimeout(() => {
      const hasMidAction = midButtonAction !== "";
      setMidButton({ ...midButton, isAnimating: hasMidAction });
      setIsAnimating(hasMidAction);
      clearTimeout(start);
    }, time);
    return true;
  }, [midButtonAction, midButton, setMidButton]);

  // Mid button animation
  useEffect(() => {
    const waitAnimation = setInterval(() => {
      const hasMidAction = midButtonAction !== "";
      const className = hasMidAction
        ? // Animated state
          "bg-blue-500 -translate-y-1 scale-110 rotate-180"
        : // Default state
          "shadow-xl shadow-blue-500/75 bg-blue-400 translate-y-0 scale-100";
      setMidButton({ ...midButton, animation: className });
      setMidButtonAnimation(className);
      clearInterval(waitAnimation);
    }, 100);
  }, [midButtonAction, midButton, setMidButton]);

  const showCreateBox = () => setIsHideCreateBox(false);

  return (
    <div className={`relative -mt-16 hover:cursor-pointer ${className}`}>
      {/* Delay animation to get smooth rotation */}
      {isMidIconRotating() && isSleepDone ? (
        <div
          className={`h-16 w-16 rounded-full bg-blue-400 p-3 text-white transition-all delay-150 duration-300 ease-in-out ${midButtonAnimation}`}
        >
          <div
            className={`transition-all delay-150 duration-300 ease-in-out ${
              midButtonAnimation.includes("rotate") && "rotate-180"
            }`}
          >
            {currentScreen === "box" ? <PencilSquareIcon /> : <AddAttachment />}
          </div>
        </div>
      ) : (
        <div
          className={`h-16 w-16 rounded-full bg-blue-400 p-3 text-white transition-all delay-150 duration-300 ease-in-out ${midButtonAnimation}`}
          onClick={showCreateBox}
        >
          <PlusIcon />
        </div>
      )}
      {midButtonAction === "edit" && (
        <Link
          href={`/box/${boxId}/edit`}
          className="absolute top-0 z-10 h-16 w-16 opacity-0"
        />
      )}
    </div>
  );
};

export default MiddleNav;
