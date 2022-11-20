import {
  EllipsisVerticalIcon,
  HomeIcon,
  TrashIcon
} from "@heroicons/react/24/solid";
import Tooltip from "components/ui/tooltip";
import {
  attachmentAtom,
  bottomNavAtom,
  boxIdAtom,
  isLoadingAtom,
  isPrintAtom
} from "configs/atoms";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";

const LeftNav = () => {
  const router = useRouter();

  const [boxId] = useAtom(boxIdAtom);
  const [isPrint] = useAtom(isPrintAtom);
  const [attachmentState] = useAtom(attachmentAtom);
  const [_, setIsLoading] = useAtom(isLoadingAtom);
  const [{ currentScreen, midButtonAction }] = useAtom(bottomNavAtom);

  const randomTooltipText = () => {
    const text = [
      "🤔 What is this?",
      "🐛 Is it a bug?",
      "😋 I wonder this...",
      "🏃 I'm running to..."
    ];

    return text[Math.floor(Math.random() * text.length)];
  };

  const deleteBox = useCallback(async () => {
    try {
      setIsLoading(true);

      // Get attachments array from attachmentState
      const attachments = Array.from(attachmentState.values()).map(
        (attachment) => attachment.metadata
      );
      const data = { id: boxId, attachments };
      const res = await fetch(`/api/box/${boxId}`, {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });
      const record = await res.json();
      return record.id;
    } catch (err) {
      console.error(err);
    }
  }, [attachmentState, boxId, setIsLoading]);
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
          className={`h-10 w-10 text-red-400 ${isPrint && "hidden"}`}
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
