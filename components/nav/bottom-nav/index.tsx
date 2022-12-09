import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Button from "components/button";
import InputField from "components/form/input-field";
import AddImage from "components/image/add-image";
import ImagePreview from "components/image/image-preview";
import { useAtom } from "jotai";
import {
  bottomNavAtom,
  imageAtom,
  isHideCreateBoxAtom,
  isWaitingUploadAtom,
  MidButtonAction,
} from "lib/atoms";
import { boxPatchSchema } from "lib/validations/box/box-patch-schema";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LeftNav from "./left-nav";
import MiddleNav from "./middle-nav";
import RightNav from "./right-nav";

type FormData = z.infer<typeof boxPatchSchema>;

type Props = {
  hide?: boolean;
};

const BottomNav = ({ hide }: Props) => {
  const router = useRouter();
  const [isWaitingUpload] = useAtom(isWaitingUploadAtom);
  const [{ currentScreen }, setNav] = useAtom(bottomNavAtom);
  const [isHideCreateBox, setIsHideCreateBox] = useAtom(isHideCreateBoxAtom);
  const [attachmentState, setAttachmentState] = useAtom(imageAtom);

  const {
    register,
    formState: { errors },
    getValues,
  } = useForm({ resolver: zodResolver(boxPatchSchema) });

  // Update nav global state
  useEffect(() => {
    const currentPath = router.pathname.split("/");
    let screenName = "home";

    // Clean up the path name
    if (currentPath.length > 1 && currentPath[1] !== "") {
      const reversedCurrentPath = currentPath
        .reverse()
        // Clean pathname from id string
        .filter((path) => !path.includes("["));
      screenName = reversedCurrentPath.join(" ").trim();
    }

    // Update midButtonAction
    let midButtonAction: MidButtonAction = "";
    if (currentScreen === "box") midButtonAction = "edit";
    else if (["add item box", "edit box"].includes(currentScreen))
      midButtonAction = "attachment";

    // Update the current screen state when the route changes
    setNav({ currentScreen: screenName, midButtonAction });
  }, [currentScreen, router.pathname, setNav]);

  const submitBox = async (values: FormData) => {
    // Get url and fileName from attachmentState
    const images: string[] = [];
    for (const value of attachmentState.values()) {
      images.push(value?.url as string);
    }

    const res = await axios.post("/api/box", { ...values, images });
    const record = res.data;

    if (record) {
      // Clear the attachmentState when new box created
      setAttachmentState(new Map());

      setIsHideCreateBox(true);
      router.replace(`/box/${record.id}`);
    }
  };

  const handleCreate = () => submitBox(getValues());
  const handleCancel = () => setIsHideCreateBox(true);

  return (
    <section
      className={`fixed bottom-0 flex w-full items-center justify-around rounded-t-[50px] border-t border-gray-800 bg-neutral-800 bg-opacity-30 backdrop-blur-lg backdrop-filter transition-all duration-300 ${
        hide && "hidden"
      } ${isHideCreateBox ? "h-24" : "h-[30rem]"}`}
    >
      {isHideCreateBox ? (
        <>
          <LeftNav />
          <MiddleNav />
          <RightNav />
        </>
      ) : (
        <section className="flex h-full w-screen flex-col justify-between px-8 py-10">
          <div>
            <InputField
              register={register}
              id="name"
              flavour="title"
              placeholder="Box Name"
              autoComplete="off"
              className="mb-2"
            />
            <InputField
              register={register}
              id="location"
              flavour="subtitle"
              placeholder="Location"
              autoComplete="off"
            />
            <div className="my-8 flex items-center gap-4">
              <AddImage className="relative h-16 w-16 rounded-full bg-blue-400 p-3" />
              <ImagePreview className="-mr-48 w-3/4" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Button disabled={isWaitingUpload} onClick={handleCreate}>
              Create
            </Button>
            <Button flavour="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </section>
      )}
    </section>
  );
};

export default BottomNav;
