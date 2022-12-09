import { CameraIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Compressor from "compressorjs";
import { useAtom } from "jotai";
import { imageAtom, isWaitingUploadAtom } from "lib/atoms";
import { useCallback, useEffect } from "react";

type Props = {
  className?: string;
};

const AddImage = ({ className }: Props) => {
  const [_isWaitingUpload, setIsWaitingUpload] = useAtom(isWaitingUploadAtom);
  const [imageState, setImageState] = useAtom(imageAtom);

  /** Index to access imageState Map */
  const imageIndex = imageState.size;

  const updateImageState = useCallback(
    (key: string, value: number | string) => {
      setImageState((prev) => {
        const newMap = new Map(prev);
        newMap.set(imageIndex, {
          ...newMap.get(imageIndex),
          [key]: value,
        });
        return newMap;
      });
    },
    [imageIndex, setImageState]
  );

  const uploadImage = useCallback(
    async (fileList: string | any[] | FileList) => {
      for (let i = 0; i < fileList.length; i++) {
        if (fileList[i].type.match(/^image\//)) {
          const file: File = fileList[i];

          // Initialize image state
          imageState.set(imageIndex, {
            status: "running",
            url: "",
            progress: 0,
          });
          updateImageState("preview", URL.createObjectURL(file));

          new Compressor(file, {
            quality: 0.6,
            maxWidth: 720,
            maxHeight: 720,
            resize: "contain",
            convertSize: 1_000_000, // 1MB
            convertTypes: [
              "image/jpeg",
              "image/png",
              "image/webp",
              "image/gif",
              "image/svg+xml",
              "image/avif",
              "image/heic",
              "image/heif",
              "image/jxl",
              "image/avif-sequence",
              "image/heic-sequence",
              "image/heif-sequence",
              "image/jxl-sequence",
              "image/apng",
              "image/bmp",
              "image/tiff",
              "image/vnd.microsoft.icon",
            ],

            // The compression process is asynchronous,
            // which means you have to access the `result` in the `success` hook function.
            success(result: File) {
              /** Randomly generate a file name with the same extension as the result file */
              const filename = encodeURIComponent(
                Math.random().toString(36).substring(2, 15) +
                  new Date().getTime().toString(36) +
                  result.name.substring(result.name.lastIndexOf("."))
              );

              // Upload compressed file to server
              axios
                .get(`/api/image/upload-url?file=${filename}`)
                .then((res) => {
                  const publicUrl = res.data.publicUrl;
                  const { url, fields } = res.data.uploadUrl;
                  const formData = new FormData();

                  Object.entries({ ...fields, file: result }).forEach(
                    ([key, value]: any[]) => {
                      formData.append(key, value);
                    }
                  );

                  axios
                    .post(url, formData, {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                      onUploadProgress: (progressEvent) => {
                        const progress = Math.round(
                          (progressEvent.loaded /
                            (progressEvent.total as number)) *
                            100
                        );

                        updateImageState("progress", progress);
                      },
                    })
                    .then((res) => {
                      updateImageState("status", "uploaded");
                      updateImageState("url", publicUrl);
                    })
                    .catch((err) => {
                      console.error(err);
                      updateImageState("status", "error");
                    });
                });
            },
            error(err) {
              console.error(err.message);
            },
          });

          break;
        }
      }
    },
    [imageState, imageIndex, updateImageState]
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
    // Check if there is any image in progress
    const isWaiting = Array.from(imageState.values()).some(
      (image) => image.status === "running"
    );
    setIsWaitingUpload(isWaiting);
  }, [imageState, setIsWaitingUpload]);

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

export default AddImage;
