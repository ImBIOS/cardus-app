import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const QuickButton: React.FC = () => {
  return (
    <Link
      href="/box/add"
      className="fixed bottom-32 right-8 rounded-full bg-blue-600 p-3 text-white"
    >
      <PlusIcon className="h-8 w-8 text-white" />
    </Link>
  );
};

export default QuickButton;
