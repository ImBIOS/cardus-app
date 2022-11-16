import { attachmentAtom } from "configs/atoms";
import { useAtom } from "jotai";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  box?: any;
  editPage?: boolean;
};

const AttachmentElement = ({ box, editPage = false }: Props) => {
  const [attachmentState] = useAtom(attachmentAtom);
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    let arrayOfPreview = [];
    for (const value of attachmentState.values()) {
      arrayOfPreview.push(value.preview);
    }

    setImages(
      editPage
        ? // What is the difference in Edit Page and Create Page?
          [...box?.attachments, ...arrayOfPreview]
        : arrayOfPreview
    );
  }, [attachmentState, box?.attachments, editPage]);

  if (images.length == 0) return <>🌅 No image</>;

  return (
    <div className="relative flex h-40 items-center justify-start overflow-x-auto overflow-y-clip bg-transparent">
      <div>
        {/* <UploadZone addImageToAttachmentArray={addImageToAttachmentArray} /> */}
      </div>
      {images.map((previewAttachment, idx) => {
        const status = attachmentState.get(idx)?.status as string;
        const progress = attachmentState.get(idx)?.progress as number;
        const progressString = !Number.isNaN(progress)
          ? `${Math.floor(progress)}%`
          : "";
        const isRunning = status === "running";

        return (
          <div key={idx} className="relative mx-1 h-40 w-full">
            <div className="w-48" />
            <Image
              fill
              sizes="100%"
              src={previewAttachment?.url}
              alt=""
              className={`rounded-lg object-cover hover:cursor-pointer ${
                isRunning ? "opacity-50" : ""
              }`}
            />
            {isRunning && (
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {progressString}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default AttachmentElement;
