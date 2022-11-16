import { CameraIcon } from "@heroicons/react/24/solid";

type Props = {
  addImageToAttachmentArray: (image: FileList) => void;
};

const UploadZone = ({ addImageToAttachmentArray }: Props) => {
  return (
    <div className="relative mr-4 flex h-40 w-48 items-center justify-center rounded-lg border-2 border-dashed border-gray-400 bg-transparent">
      <div className="absolute">
        <div className="flex flex-col items-center ">
          <i className="fa fa-cloud-upload fa-3x text-gray-200" />
          <span className="block font-normal text-gray-400">
            <CameraIcon className="h-20 w-20 text-gray-400" />
          </span>
          <span className="mx-2 block cursor-pointer text-center font-normal text-gray-400">
            Tap here to take a picture of the item
          </span>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        className="h-full w-full opacity-0 hover:cursor-pointer"
        name=""
        onChange={(e) => {
          if (e.target.files !== null) {
            addImageToAttachmentArray(e.target.files);
          }
        }}
        onDrop={(e) => {
          e.stopPropagation();
          e.preventDefault();

          // setAttachments(e.dataTransfer.files);
          addImageToAttachmentArray(e.dataTransfer.files);
        }}
        onDragOver={(e) => {
          e.stopPropagation();
          e.preventDefault();

          e.dataTransfer.dropEffect = "copy";
        }}
      />
    </div>
  );
};

export default UploadZone;
