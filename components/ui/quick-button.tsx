import { PlusIcon } from "@heroicons/react/24/solid";
import { useAtom } from "jotai";
import { isHideCreateBoxAtom } from "lib/atoms";

const QuickButton = () => {
  const [_, setIsHideCreateBox] = useAtom(isHideCreateBoxAtom);

  const handleOnClick = () => setIsHideCreateBox(false);

  return (
    <button
      onClick={handleOnClick}
      className="fixed bottom-32 right-8 rounded-full bg-blue-400 p-3 text-white"
    >
      <PlusIcon className="h-8 w-8 text-white" />
    </button>
  );
};

export default QuickButton;
