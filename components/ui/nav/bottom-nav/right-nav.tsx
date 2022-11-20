import {
  PrinterIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon
} from "@heroicons/react/24/solid";
import Tooltip from "components/ui/tooltip";
import { bottomNavAtom, isPrintAtom } from "configs/atoms";
import rgbDataURL from "helpers/image-placeholder";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";

const RightNav = () => {
  const { data: session } = useSession();
  const [{ currentScreen, midButtonAction }] = useAtom(bottomNavAtom);
  const [isPrint, setIsPrint] = useAtom(isPrintAtom);

  const randomTooltipText = () => {
    const text = [
      "🤔 What is this?",
      "🐛 Is it a bug?",
      "😋 I wonder this...",
      "🏃 I'm running to..."
    ];

    return text[Math.floor(Math.random() * text.length)];
  };

  const generatePDF = useCallback(() => {
    setIsPrint(true);
    // Wait for re-render to finish
    const print = setInterval(() => {
      window?.print();
      setIsPrint(false);
      clearInterval(print);
    }, 1);
  }, [setIsPrint]);
  return (
    <>
      {midButtonAction === "" && (
        <Link href="/profile" className="relative h-12 w-12">
          {session?.user?.image ? (
            <Image
              className={`rounded-full object-cover ${
                currentScreen === "profile" && "border-4 border-blue-400"
              }`}
              src={session.user.image}
              fill
              placeholder="blur"
              blurDataURL={rgbDataURL(96, 165, 250)}
              sizes="100%"
              alt="user avatar"
            />
          ) : (
            <UserCircleIcon
              className={`h-10 w-10 ${
                currentScreen === "profile" && "text-blue-400"
              }`}
            />
          )}
        </Link>
      )}
      {midButtonAction === "edit" && (
        <PrinterIcon
          className={`h-10 w-10 ${isPrint && "hidden"}`}
          onClick={generatePDF}
        />
      )}
      {midButtonAction === "attachment" && (
        <Tooltip text={randomTooltipText()}>
          <QuestionMarkCircleIcon className="h-10 w-10 text-neutral-400" />
        </Tooltip>
      )}
    </>
  );
};

export default RightNav;
