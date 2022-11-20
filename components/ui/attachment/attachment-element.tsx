import { XMarkIcon } from "@heroicons/react/24/solid";
import Modal from "components/ui/modal";
import { attachmentAtom, IAttachment, IAttachmentAtom } from "configs/atoms";
import { useAtom } from "jotai";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  box?: any;
  readOnly?: boolean;
  className?: string;
};

interface IDeleteData {
  key: number;
  value: IAttachmentAtom;
}

const AttachmentElement = ({ box, readOnly = false, className }: Props) => {
  const [attachmentState, setAttachmentState] = useAtom(attachmentAtom);

  const [isOpen, setIsOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<IDeleteData>();

  const openModal = () => setIsOpen(true);
  const onCancel = () => setIsOpen(false);
  const onAccept = () => {
    setIsOpen(false);
    deleteData && handleDeleteAttachment(deleteData);
  };

  // Delete attachment from Firebase Storage
  const deleteAttachment = async (fileName: string) =>
    await fetch("/api/attachment", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ fileName })
    });

  const handleDeleteAttachment = ({ key, value }: IDeleteData) => {
    deleteAttachment(value?.metadata?.fileName as string);
    setAttachmentState((prev) => {
      const newMap = new Map(prev);
      newMap.delete(key);
      return newMap;
    });
  };

  // If box.attachments.length more than 0, then setAttachmentState with these attachments as Map
  useEffect(() => {
    if (box && box.attachments.length > 0) {
      const map = new Map();
      box.attachments.forEach((attachment: IAttachment, index: number) => {
        map.set(index, { metadata: attachment });
      });
      setAttachmentState(map);
    }
  }, [box, setAttachmentState]);

  if (attachmentState.size === 0)
    return <div className={className}>🌅 No image</div>;

  return (
    <div
      className={`relative flex h-40 items-center justify-start overflow-x-auto overflow-y-clip bg-transparent ${className}`}
    >
      {Array.from(attachmentState).map(([key, value]) => {
        const isRunning = attachmentState.get(key)?.status === "running";
        const progressString = attachmentState.get(key)?.progress + "%";

        return (
          <div key={`attachment-${key}`} className="relative mx-1 h-40 w-full">
            <div className="relative w-48" />
            <Image
              fill
              sizes="100%"
              src={value?.metadata?.url as string}
              alt=""
              className={`rounded-lg object-cover hover:cursor-pointer ${
                isRunning ? "animate-pulse" : ""
              }`}
            />
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
export default AttachmentElement;
