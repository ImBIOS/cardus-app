import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon
} from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import { Fragment, useEffect, useState } from "react";

const ThemeSwitch: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button className="group flex h-12 w-56 items-center justify-around rounded-full border px-4 py-2">
            {theme !== "light" ? (
              <div className="flex gap-2">
                <MoonIcon
                  className={`h-6 w-6 ${theme !== "system" && "text-blue-400"}`}
                />
                {theme !== "system" ? "Dark Theme" : "System Theme"}
              </div>
            ) : (
              <SunIcon className="h-6 w-6 text-blue-400" />
            )}
            <ChevronDownIcon
              className={`h-6 w-6 transition-all duration-150 ${
                open && "rotate-180"
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
            <Menu.Items className="absolute right-0 z-10 mt-2 w-24 origin-top divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-800 dark:shadow-neutral-600/25">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setTheme("light")}
                      className={`${
                        active
                          ? "bg-violet-500 text-white"
                          : "text-gray-900 dark:text-gray-200"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <SunIcon
                        className={`mr-2 h-5 w-5 transition delay-150 duration-300 ease-in-out ${
                          active && "rotate-180 scale-110"
                        }`}
                        aria-hidden
                      />
                      Light
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setTheme("dark")}
                      className={`${
                        active
                          ? "bg-violet-500 text-white"
                          : "text-gray-900 dark:text-gray-200"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <MoonIcon
                        className={`mr-2 h-5 w-5 transition delay-150 duration-300 ease-in-out ${
                          active && "rotate-180 scale-110"
                        }`}
                        aria-hidden
                      />
                      Dark
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setTheme("system")}
                      className={`${
                        active
                          ? "bg-violet-500 text-white"
                          : "text-gray-900 dark:text-gray-200"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <ComputerDesktopIcon
                        className={`mr-2 h-5 w-5 transition delay-150 duration-300 ease-in-out ${
                          active && "rotate-180 scale-110"
                        }`}
                        aria-hidden
                      />
                      System
                    </button>
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

export default ThemeSwitch;
