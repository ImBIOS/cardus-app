import { XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Modal from "components/modal";
import { useAtom } from "jotai";
import { IImageAtom, imageAtom } from "lib/atoms";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  images?: string[];
  readOnly?: boolean;
  className?: string;
};

interface IDeleteData {
  key: number;
  value: IImageAtom;
}

const ImagePreview = ({ images, readOnly = false, className }: Props) => {
  const [imageState, setImageState] = useAtom(imageAtom);

  const [isOpen, setIsOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<IDeleteData>();

  const openModal = () => setIsOpen(true);
  const onCancel = () => setIsOpen(false);
  const onAccept = () => {
    setIsOpen(false);
    deleteData && handleDeleteAttachment(deleteData);
  };

  // Delete attachment from Storage
  const deleteAttachment = async (fileName: string) =>
    await axios.delete(`/api/image/${fileName}`);

  const handleDeleteAttachment = ({ key, value }: IDeleteData) => {
    if (value.url) {
      const filename = value.url
        .split("/")
        .reverse()[0]
        .replace("?alt=media", "");

      deleteAttachment(filename);
    }

    setImageState((prev) => {
      const newMap = new Map(prev);
      newMap.delete(key);
      return newMap;
    });
  };

  // If box.images.length more than 0, then setAttachmentState with these images as Map
  useEffect(() => {
    if (images && images.length > 0) {
      const map = new Map();
      images.forEach((image: string, index: number) => {
        map.set(index, { url: image });
      });
      setImageState(map);
    }
  }, [images, setImageState]);

  if (imageState.size === 0)
    return <div className={className}>🌅 No image</div>;

  return (
    <div
      className={`relative flex h-40 items-center justify-start overflow-x-auto overflow-y-clip bg-transparent ${className}`}
    >
      {Array.from(imageState).map(([key, value]) => {
        const status = imageState.get(key)?.status;
        const isRunning = status === "running";
        const isError = status === "error";
        const progressString = imageState.get(key)?.progress + "%";

        return (
          <div key={`attachment-${key}`} className="relative mx-1 h-40 w-48">
            <div className="relative w-full" />
            <Image
              fill
              sizes="100%"
              src={(value?.url as string) || (value?.preview as string)}
              alt=""
              className={`rounded-lg object-cover hover:cursor-pointer ${
                isRunning && "animate-pulse"
              }`}
            />
            {isError && (
              <div className="opacity-z-50 absolute flex h-40 w-full animate-pulse items-center justify-center rounded-md bg-red-500 text-white">
                Error, You can delete it.
              </div>
            )}
            {/* Delete button */}
            {!readOnly && (
              <button
                className="absolute top-0 right-0 z-10 rounded-full bg-red-400 p-1 hover:bg-neutral-600"
                onClick={() => {
                  openModal();
                  setDeleteData({ key, value });
                }}
              >
                <XMarkIcon className="h-5 w-5 text-neutral-200" />
              </button>
            )}
            {isRunning && (
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {progressString}
              </p>
            )}
          </div>
        );
      })}
      {!readOnly && (
        <Modal
          isOpen={isOpen}
          title="Delete Attachment"
          description="Are you sure you want to delete this image?"
          acceptText="Delete"
          onCancel={onCancel}
          onAccept={onAccept}
        />
      )}
    </div>
  );
};
export default ImagePreview;
