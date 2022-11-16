import { Menu, Transition } from "@headlessui/react";
import { Fragment, useMemo } from "react";

const Hamburger = () => {
  const genericHamburgerLine = useMemo(
    () =>
      "h-1 w-8 my-1 rounded-full bg-black transition ease transform duration-300 bg-neutral-200",
    []
  );

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button className="group flex h-12 w-12 flex-col items-center justify-center rounded">
            <div
              className={`${genericHamburgerLine} ${
                open
                  ? "translate-y-3 rotate-45 group-hover:opacity-100"
                  : "group-hover:opacity-100"
              }`}
            />
            <div
              className={`${genericHamburgerLine} ${
                open ? "opacity-0" : "group-hover:opacity-100"
              }`}
            />
            <div
              className={`${genericHamburgerLine} ${
                open
                  ? "-translate-y-3 -rotate-45 group-hover:opacity-100"
                  : "group-hover:opacity-100"
              }`}
            />
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
            <Menu.Items className="absolute left-0 z-10 mt-2 w-36 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-800 dark:shadow-neutral-600/25">
              <div className="px-1 py-1">
                {/* <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-violet-500 text-white"
                        : "text-gray-900 dark:text-gray-200"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <Squares2X2Icon
                      className={`mr-2 h-5 w-5 transition delay-150 duration-300 ease-in-out ${
                        active && "rotate-180 scale-110"
                      }`}
                      aria-hidden
                    />
                    List View
                  </button>
                )}
              </Menu.Item> */}
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
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default Hamburger;
