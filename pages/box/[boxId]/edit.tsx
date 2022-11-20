import { MinusIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import MobileLayout from "components/layout/mobile-layout";
import PromptScreen from "components/screen/prompt/prompt-screen";
import AttachmentElement from "components/ui/attachment/attachment-element";
import { attachmentAtom, IAttachment, topNavAtom } from "configs/atoms";
import { boxPatchSchema } from "helpers/validations/box-patch-schema";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";

type FormData = z.infer<typeof boxPatchSchema>;

const EditBox = () => {
  const router = useRouter();
  const { boxId } = router.query;
  const [_, setTopNav] = useAtom(topNavAtom);
  const [attachmentState] = useAtom(attachmentAtom);

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
  } = useForm<FormData>({
    resolver: zodResolver(boxPatchSchema)
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  const fetcher = (url: RequestInfo) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(
    () => (boxId ? "/api/box/" + boxId : null),
    fetcher
  );

  // Set defaultValue for the form
  useEffect(() => {
    if (data) {
      const { name, location, items, attachments } = data.res;

      setValue("name", name);
      setValue("location", location);
      setValue("items", items);
      setValue("attachments", attachments);
    }
  }, [data, setValue]);

  // Log error
  useEffect(() => {
    console.error(errors);
  }, [errors]);

  // Set top nav action
  useEffect(() => {
    const onSubmit = (values: FormData) => {
      if (data) {
        const { name, location } = values;
        const box = data.res;

        // Clean items from empty values
        const items = values.items?.filter((item) => item.name !== "");

        // Turn attachmentState Map into an array of url object
        const attachments: IAttachment[] = [];
        for (const value of attachmentState.values()) {
          attachments?.push({
            url: value.metadata?.url as string,
            fileName: value.metadata?.fileName as string
          });
        }

        // Check what data that has been changed
        const req: FormData = {
          id: boxId as string
        };

        name != box.name && (req.name = name);
        items != box.items && (req.items = items);
        attachments != box.attachments && (req.attachments = attachments);
        location != box.location && (req.location = location);

        const updateData = async (data: FormData) => {
          const res = await fetch(`/api/box/${data.id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
          });
          const record = await res.json();
          return record.id;
        };

        // If there is no change, throw Error
        if (Object.keys(req).length > 0) {
          updateData(req).then((id) => {
            router.replace(`/box/${id}`);
          });
        } else {
          throw new Error("No changes detected");
        }
      }
    };

    setTopNav({
      submitAction: () => onSubmit(getValues())
    });
  }, [attachmentState, boxId, data, getValues, router, setTopNav]);

  if (error) return <div>failed to load</div>;
  if (!data) return <PromptScreen type="loading" />;

  const box = data.res;

  const handleOnItemInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    const items = getValues("items");
    // if items is defined
    if (items) {
      // When enter is pressed, focus to next input
      if (
        idx === items.length - 1 &&
        e.key === "Enter" &&
        items[idx].name !== ""
      ) {
        e.preventDefault();

        append({ name: "" }, { shouldFocus: true });
      }
    }
  };

  return (
    <MobileLayout>
      <section className="mx-auto mt-8 mb-0 flex w-[90%] max-w-4xl flex-col">
        <header className="mb-4 flex">
          <div>
            <input
              {...register("name")}
              className="w-full border-0 bg-transparent text-4xl font-semibold  leading-3 outline-none"
              autoComplete="off"
              placeholder="Box Name"
              defaultValue={box.name}
            />
            <input
              {...register("location")}
              className="mt-2 w-full border-0 bg-transparent py-2 px-0 font-light outline-none"
              placeholder="Box Location"
              defaultValue={box.location}
              autoComplete="off"
            />
          </div>
        </header>
        {fields.map((item, index) => (
          <div key={item.id} className="flex justify-between">
            <input
              {...register(`items.${index}.name` as const)}
              defaultValue={item.name}
              autoComplete="off"
              onFocus={(e) =>
                (e.target.placeholder = "Type the item name clearly")
              }
              onBlur={(e) => (e.target.placeholder = "Tap here to add an item")}
              onKeyDown={(e) => handleOnItemInputKeyDown(e, index)}
              className="bg-transparent py-4 px-0 text-lg outline-none"
              placeholder="Tap here to add an item"
            />
            <button onClick={() => remove(index)}>
              <MinusIcon className="h-5 w-5 rounded-full bg-red-400 text-white" />
            </button>
          </div>
        ))}
        <AttachmentElement box={box} />
      </section>
    </MobileLayout>
  );
};

export default EditBox;
