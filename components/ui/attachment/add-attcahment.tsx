import { CameraIcon } from "@heroicons/react/24/solid";
import {
  attachmentAtom,
  IAttachment,
  isWaitingUploadAtom
} from "configs/atoms";
import { storage } from "configs/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { compressAccurately } from "image-conversion";
import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";

type Props = {
  className?: string;
};

const AddAttachment = ({ className }: Props) => {
  const [_, setIsWaitingUpload] = useAtom(isWaitingUploadAtom);
  const [attachmentState, setAttachmentState] = useAtom(attachmentAtom);

  /** Index to access attachmentState Map */
  const imageIndex = attachmentState.size;

  const updateAtomAttachmentState = useCallback(
    (key: string, value: IAttachment | number | string) => {
      setAttachmentState((prev) => {
        const newMap = new Map(prev);
        newMap.set(imageIndex, {
          ...newMap.get(imageIndex),
          [key]: value
        });
        return newMap;
      });
    },
    [imageIndex, setAttachmentState]
  );

  const uploadImage = useCallback(
    async (fileList: string | any[] | FileList) => {
      for (let i = 0; i < fileList.length; i++) {
        if (fileList[i].type.match(/^image\//)) {
          const file = fileList[i];

          // Create the file metadata
          /** @type {any} */
          const metadata = {
            contentType: "image/jpeg"
          };

          const getTime = new Date().getTime();
          const fileName = `${getTime}-${(Math.random() + 1)
            .toString(36)
            .substring(2)}-${file.name}`;

          const compressedFile = await compressAccurately(file, 80);

          // Upload file and metadata to the object 'images/filename'
          const storageRef = ref(storage, "images/" + fileName);
          const uploadTask = uploadBytesResumable(
            storageRef,
            compressedFile,
            metadata
          );

          const previewAttachment = {
            fileName: fileName,
            url: URL.createObjectURL(compressedFile)
          };

          // Initialize image state
          attachmentState.set(imageIndex, {
            metadata: previewAttachment,
            status: "uploading",
            url: "",
            progress: 0
          });

          // Listen for state changes, errors, and completion of the upload.
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              updateAtomAttachmentState("progress", progress);
              switch (snapshot.state) {
                case "paused":
                  updateAtomAttachmentState("status", "paused");
                  break;
                case "running":
                  updateAtomAttachmentState("status", "running");
                  break;
              }
            },
            (error) => {
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
                case "storage/unauthorized":
                  // User doesn't have permission to access the object
                  break;
                case "storage/canceled":
                  // User canceled the upload
                  break;

                // ...

                case "storage/unknown":
                  // Unknown error occurred, inspect error.serverResponse
                  break;
              }
            },
            () => {
              // Upload completed successfully, now we can get the download URL
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                updateAtomAttachmentState("url", downloadURL);
                updateAtomAttachmentState("status", "done");
              });
            }
          );

          break;
        }
      }
    },
    [attachmentState, imageIndex, updateAtomAttachmentState]
  );

  const handleOnDrop = useCallback(
    (e: React.DragEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const files = e.dataTransfer.files;

      uploadImage(files);
    },
    [uploadImage]
  );

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files !== null) {
        uploadImage(e.target.files);
      }
    },
    [uploadImage]
  );

  const handleOnDragOver = useCallback(
    (e: React.DragEvent<HTMLInputElement>) => {
      e.stopPropagation();
      e.preventDefault();

      e.dataTransfer.dropEffect = "copy";
    },
    []
  );

  // Listen and update waiting state
  useEffect(() => {
    // Check if there is any attachment in progress
    const isWaiting = Array.from(attachmentState.values()).some(
      (attachment) => attachment.status === "running"
    );
    setIsWaitingUpload(isWaiting);
  }, [attachmentState, setIsWaitingUpload]);

  return (
    <div className={className}>
      <CameraIcon />
      <input
        type="file"
        accept="image/*"
        onDrop={handleOnDrop}
        onDragOver={handleOnDragOver}
        onChange={handleOnChange}
        className="absolute top-0 z-10 h-16 w-16 opacity-0"
      />
    </div>
  );
};

export default AddAttachment;
