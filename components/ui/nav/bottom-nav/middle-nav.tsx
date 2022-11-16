import { CameraIcon, PlusIcon } from "@heroicons/react/24/solid";
import {
  attachmentAtom,
  bottomNavAtom,
  IAttachment,
  isWaitingUploadAtom,
  midBottomNavAtom
} from "configs/atoms";
import { storage } from "configs/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { compressAccurately } from "image-conversion";
import { useAtom } from "jotai";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

const MiddleNav = () => {
  const [{ currentScreen }] = useAtom(bottomNavAtom);
  const [midButton, setMidButton] = useAtom(midBottomNavAtom);
  const [_, setWaitingState] = useAtom(isWaitingUploadAtom);
  const [attachmentState, setAttachmentState] = useAtom(attachmentAtom);

  const [imageIndex, setImageIndex] = useState(0);
  const [isSleepDone, setIsAnimating] = useState(midButton.isAnimating);
  const [midButtonAnimation, setMidButtonAnimation] = useState(
    midButton.animation
  );

  const isFormScreen = useMemo(
    () => ["add box", "edit box"].includes(currentScreen),
    [currentScreen]
  );

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

  const isMidIconRotating = useCallback(() => {
    const time = 400;
    const start = setTimeout(() => {
      setMidButton({ ...midButton, isAnimating: isFormScreen });
      setIsAnimating(isFormScreen);
      clearTimeout(start);
    }, time);
    return true;
  }, [isFormScreen, midButton, setMidButton]);

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
            preview: previewAttachment,
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
                  setWaitingState(false);
                  break;
                case "running":
                  updateAtomAttachmentState("status", "running");
                  setWaitingState(true);
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
                setWaitingState(false);
                setImageIndex(imageIndex + 1);
              });
            }
          );

          break;
        }
      }
    },
    [attachmentState, imageIndex, setWaitingState, updateAtomAttachmentState]
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

  // Mid button animation
  useEffect(() => {
    const waitAnimation = setInterval(() => {
      const className = isFormScreen
        ? // Animated state
          "bg-blue-500 -translate-y-1 scale-110 rotate-180"
        : // Default state
          "shadow-xl shadow-blue-500/75 bg-blue-400 translate-y-0 scale-100";
      setMidButton({ ...midButton, animation: className });
      setMidButtonAnimation(className);
      clearInterval(waitAnimation);
    }, 100);
  }, [isFormScreen, midButton, setMidButton]);

  return (
    <div className="relative -mt-16 hover:cursor-pointer">
      <Link href="/box/add">
        <div
          className={`h-16 w-16 rounded-full bg-blue-400 p-3 text-white transition-all delay-150 duration-300 ease-in-out ${midButtonAnimation}`}
        >
          {/* Delay animation to get smooth rotation */}
          {isMidIconRotating() && isSleepDone ? (
            <CameraIcon
              className={`transition-all delay-150 duration-300 ease-in-out hover:cursor-pointer ${
                midButtonAnimation.includes("rotate") && "rotate-180"
              }`}
            />
          ) : (
            <PlusIcon />
          )}
        </div>
      </Link>
      {isFormScreen && (
        <input
          type="file"
          accept="image/*"
          onDrop={handleOnDrop}
          onDragOver={handleOnDragOver}
          onChange={handleOnChange}
          className="absolute top-0 z-10 h-16 w-16 opacity-0 hover:cursor-pointer"
        />
      )}
    </div>
  );
};

export default MiddleNav;
