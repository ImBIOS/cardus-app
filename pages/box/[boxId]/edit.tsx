import { zodResolver } from "@hookform/resolvers/zod";
import MobileLayout from "components/layout/mobile-layout";
import PromptScreen from "components/screen/prompt/prompt-screen";
import AttachmentElement from "components/ui/attachment/attachment-element";
import { attachmentAtom, topNavAtom } from "configs/atoms";
import { boxPatchSchema } from "helpers/validations/box-patch-schema";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";

type FormData = z.infer<typeof boxPatchSchema>;

const EditStorage = () => {
  const router = useRouter();
  const { boxId } = router.query;
  const [_, setTopNav] = useAtom(topNavAtom);
  const [attachmentState, setAttachmentState] = useAtom(attachmentAtom);

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

  const name = getValues("name");
  const location = getValues("location");
  const items = getValues("items");
  const attachments = getValues("attachments");

  // Ref to the input item element
  const inputItemRef = useRef<HTMLInputElement[]>([]);

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
      // setAttachmentState(
      //   attachmentState.map((state) => {
      //     return { ...state, status: "done" };
      //   })
      // );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // Set Submit Button
  useEffect(() => {
    if (data) {
      const onSubmit = () => {
        const box = data.res;

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
          updateData(req).then(() => {
            router.replace(`/box/${boxId}`);
          });
        } else {
          throw new Error("No changes detected");
        }
      };

      setTopNav({ submitAction: handleSubmit(onSubmit) });
    }
  }, [
    attachments,
    boxId,
    data,
    handleSubmit,
    items,
    location,
    name,
    router,
    setTopNav
  ]);

  // Auto add new item
  // TODO: update with the react-hook-form dynamic fields
  // useEffect(() => {
  //   // add new items when the last item is not empty
  //   if (items && items.length > 0 && items[items.length - 1].name !== "") {
  //     setValue("items", [...items, { name: "" }]);
  //   }
  // }, [items, setValue]);

  if (error) return <div>failed to load</div>;
  if (!data) return <PromptScreen type="loading" />;

  const box = data.res;

  // const handleOnItemInputKeyDown = (
  //   e: React.KeyboardEvent<HTMLInputElement>,
  //   idx: number
  // ) => {
  //   // if items is defined
  //   if (items) {
  //     // When enter is pressed, focus to next input
  //     const targetElement =
  //       inputItemRef.current[idx === items.length - 1 ? 0 : idx + 1];
  //     if (e.key === "Enter" && targetElement) {
  //       targetElement.focus();
  //     } else if (e.key === "Backspace" && items[idx].name === "") {
  //       // When backspace is pressed,
  //       // delete this item and focus to previous input
  //       // if this is the only item, do nothing
  //       if (items.length > 1) {
  //         setValue(
  //           "items",
  //           items.filter((_, i) => i !== idx)
  //         );
  //         const targetElement = inputItemRef.current[idx - 1];
  //         if (targetElement) {
  //           targetElement.focus();
  //         }
  //       }
  //     }
  //   }
  // };

  return (
    <MobileLayout>
      <section className="mx-auto mt-8 mb-0 flex w-[90%] max-w-4xl flex-col lg:mt-32">
        <header className="mb-4 flex">
          {/* Meta */}
          <div>
            <input
              {...register("name")}
              className="w-full border-0 bg-transparent text-4xl font-semibold  leading-3 outline-none lg:text-6xl"
              type="text"
              autoComplete="off"
              placeholder="Storage Name"
              defaultValue={box.name}
              // onChange={(e) => setTitle(e.target.value)}
            />
            <input
              {...register("location")}
              className="mt-2 w-full border-0 bg-transparent py-2 px-0 font-light outline-none"
              placeholder="Storage Location"
              defaultValue={box.location}
              name="place"
              type="text"
              autoComplete="off"
              // onChange={(e) => setPlace(e.target.value)}
            />
          </div>
        </header>
        {fields.map((item: { name: string }, index: number) => (
          <input
            {...register(`items.${index}.name` as const)}
            ref={(el: HTMLInputElement) => (inputItemRef.current[index] = el)}
            key={`item-${index}`}
            name="items"
            value={item.name}
            autoComplete="off"
            // onChange={(e) =>
            //   // update specific item
            //   setItems((prev) => {
            //     prev[index].name = e.target.value;
            //     return [...prev];
            //   })
            // }
            onFocus={(e) =>
              (e.target.placeholder = "Type the item name clearly")
            }
            onBlur={(e) => (e.target.placeholder = "Tap here to add an item")}
            // onKeyDown={(e) => handleOnItemInputKeyDown(e, index)}
            className="bg-transparent py-4 px-0 text-lg outline-none lg:text-2xl"
            placeholder="Tap here to add an item"
          />
        ))}
        <AttachmentElement box={box} editPage />
      </section>
    </MobileLayout>
  );
};

export default EditStorage;
