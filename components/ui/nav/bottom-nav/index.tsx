import { zodResolver } from "@hookform/resolvers/zod";
import AddAttachment from "components/ui/attachment/add-attcahment";
import AttachmentElement from "components/ui/attachment/attachment-element";
import Button from "components/ui/button";
import InputField from "components/ui/form/input-field";
import {
  bottomNavAtom,
  isHideCreateBoxAtom,
  isWaitingUploadAtom,
  MidButtonAction
} from "configs/atoms";
import { boxPatchSchema } from "helpers/validations/box-patch-schema";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import LeftNav from "./left-nav";
import MiddleNav from "./middle-nav";
import RightNav from "./right-nav";

type Props = {
  hide?: boolean;
};

const BottomNav = ({ hide }: Props) => {
  const { pathname } = useRouter();
  const [isWaitingUpload] = useAtom(isWaitingUploadAtom);
  const [{ currentScreen }, setNav] = useAtom(bottomNavAtom);
  const [isHideCreateBox, setIsHideCreateBox] = useAtom(isHideCreateBoxAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
    reset,
    trigger,
    setError
  } = useForm({ resolver: zodResolver(boxPatchSchema) });

  // Update nav global state
  useEffect(() => {
    const currentPath = pathname.split("/");
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
    else if (["add box", "edit box"].includes(currentScreen))
      midButtonAction = "attachment";

    // Update the current screen state when the route changes
    setNav({ currentScreen: screenName, midButtonAction });
  }, [currentScreen, pathname, setNav]);

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
        <section className="mx-8 flex h-full flex-col justify-between py-10">
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
              id="name"
              flavour="subtitle"
              placeholder="Location"
              autoComplete="off"
            />
            <div className="flex items-center gap-4">
              <AddAttachment className="relative my-8 h-16 w-16 rounded-full bg-blue-400 p-3" />
              <AttachmentElement className="my-8 -mr-48 w-3/4" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Button
              disabled={isWaitingUpload}
              onClick={() => console.log("create")}
            >
              Create
            </Button>
            <Button
              disabled={isWaitingUpload}
              flavour="secondary"
              onClick={() => setIsHideCreateBox(true)}
            >
              Cancel
            </Button>
          </div>
        </section>
      )}
    </section>
  );
};

export default BottomNav;
