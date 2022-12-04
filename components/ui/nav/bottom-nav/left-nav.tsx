import {
  EllipsisVerticalIcon,
  HomeIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import Tooltip from "components/ui/tooltip";
import { useAtom } from "jotai";
import { bottomNavAtom, boxIdAtom, isLoadingAtom } from "lib/atoms";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";

const LeftNav = () => {
  const router = useRouter();

  const [boxId] = useAtom(boxIdAtom);
  const [_, setIsLoading] = useAtom(isLoadingAtom);
  const [{ currentScreen, midButtonAction }] = useAtom(bottomNavAtom);

  const randomTooltipText = () => {
    const text = [
      "🤔 What is this?",
      "🐛 Is it a bug?",
      "😋 I wonder this...",
      "🏃 I'm running to...",
    ];

    return text[Math.floor(Math.random() * text.length)];
  };

  const deleteBox = useCallback(async () => {
    try {
      setIsLoading(true);

      const res = await axios.delete(`/api/box/${boxId}`);
      return res.data.id;
    } catch (err) {
      console.error(err);
    }
  }, [boxId, setIsLoading]);

  return (
    <>
      {midButtonAction === "" && (
        <Link href="/">
          <HomeIcon
            className={`h-10 w-10 ${
              currentScreen === "home" && "text-blue-400"
            }`}
          />
        </Link>
      )}
      {midButtonAction === "edit" && (
        <TrashIcon
          className="h-10 w-10 text-red-400"
          onClick={() => deleteBox().then(() => router.replace("/"))}
        />
      )}
      {midButtonAction === "attachment" && (
        <Tooltip text={randomTooltipText()}>
          <EllipsisVerticalIcon className="h-10 w-10 text-neutral-400" />
        </Tooltip>
      )}
    </>
  );
};

export default LeftNav;
