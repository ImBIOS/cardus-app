import { Menu, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useAtom } from "jotai";
import { createBoxModeAtom, isHideCreateBoxAtom } from "lib/atoms";
import { Fragment } from "react";

const menu = ["single", "bulk"];

const QuickButton = () => {
  const [_ishideCreateBox, setIsHideCreateBox] = useAtom(isHideCreateBoxAtom);
  const [_createBoxMode, setCreateBoxMode] = useAtom(createBoxModeAtom);

  const handleOnClick = (mode: string) => {
    setCreateBoxMode(mode);
    setIsHideCreateBox(false);
  };

  return (
    <div className="fixed bottom-32 right-8">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-400 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <PlusIcon
              className="h-8 w-8 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-24 origin-top-right -translate-y-[calc(100%+72px)] divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
            <div className="px-1 py-1 ">
              {menu.map((item, idx) => (
                <Menu.Item key={`quick-button-${item}-${idx}`}>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? "bg-violet-500 text-white"
                          : "text-gray-900 dark:text-gray-200"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm capitalize`}
                      onClick={() => handleOnClick(item)}
                    >
                      {item}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default QuickButton;
