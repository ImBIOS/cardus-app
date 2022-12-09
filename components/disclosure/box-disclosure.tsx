import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import BoxItemImages from "../box/box-item-images";
import InputField from "../form/input-field";
import ImagePreview from "../image/image-preview";

export type BoxDisclosureProps = {
  title?: string;
  subtitle?: string;
  images?: string[];
  className?: string;
};

const BoxDisclosure = ({
  title,
  subtitle,
  images,
  className,
}: BoxDisclosureProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => setIsOpen(!isOpen);

  return (
    <>
      <div
        className={`flex w-full flex-col justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 transition-all duration-300 ease-in-out hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 dark:bg-blue-800 dark:text-blue-200 dark:hover:bg-blue-900 ${
          isOpen ? "h-72" : "h-24"
        } ${className}`}
        onClick={handleOnClick}
      >
        <div className="flex items-center">
          <div
            className={`del flex w-[90%] gap-4 transition-all delay-500 duration-500 ease-in-out ${
              isOpen ? "flex-col-reverse" : "items-center"
            }`}
          >
            <div className="w-[90%] overflow-x-auto">
              {isOpen ? (
                <ImagePreview images={images} readOnly />
              ) : (
                <div className="relative mr-4 flex items-center">
                  <BoxItemImages
                    images={images}
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen && "h-36 w-24"
                    }`}
                  />
                </div>
              )}
            </div>
            <div>
              <InputField flavour="title" defaultValue={title} readOnly />
              <InputField flavour="subtitle" defaultValue={subtitle} readOnly />
            </div>
          </div>
          <ChevronUpIcon
            className={`${
              isOpen ? "rotate-180 transform" : ""
            } h-12 w-12 text-blue-500`}
          />
        </div>
      </div>
    </>
  );
};

export default BoxDisclosure;
