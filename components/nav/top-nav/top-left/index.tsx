import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Hamburger from "./hamburger";

const TopLeft = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button className="group flex h-12 w-12 flex-col items-center justify-center rounded">
            <Hamburger open={open} />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute left-0 z-10 mt-2 w-48 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-800 dark:shadow-neutral-600/25">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a href="mailto:hi@imam.dev">
                      <button
                        className={`${
                          active
                            ? "bg-violet-500 text-white"
                            : "text-gray-900 dark:text-gray-200"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <span
                          className="mr-2 h-5 w-5 origin-bottom-right animate-[wave-animation_2.5s_ease-in-out_infinite]"
                          aria-hidden
                        >
                          👋
                        </span>
                        Hi Imam! 😁
                      </button>
                    </a>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="https://github.com/ImBIOS/cardus-app/issues/new/choose"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <button
                        className={`${
                          active
                            ? "bg-violet-500 text-white"
                            : "text-gray-900 dark:text-gray-200"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        🤔 Bug, Feature, or Idea?
                      </button>
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default TopLeft;
