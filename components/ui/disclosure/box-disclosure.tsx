import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import BoxItemImages from "../box/box-item-images";
import InputField from "../form/input-field";
import ImagePreview from "../image/image-preview";

type Props = {
  title?: string;
  subtitle?: string;
  images?: string[];
};

const BoxDisclosure = ({ title, subtitle, images }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => setIsOpen(!isOpen);

  return (
    <>
      <div
        className={`flex w-full flex-col justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 transition-all duration-300 ease-in-out hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 ${
          isOpen ? "h-72" : "h-24"
        }`}
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
            } h-12 w-12 text-purple-500`}
          />
        </div>
      </div>
    </>
  );
};

export default BoxDisclosure;
