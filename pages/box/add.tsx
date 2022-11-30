import { MinusIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import MobileLayout from "components/layout/mobile-layout";
import AttachmentElement from "components/ui/attachment/attachment-element";
import InputField from "components/ui/form/input-field";
import { attachmentAtom, IAttachment, topNavAtom } from "configs/atoms";
import { boxPatchSchema } from "helpers/validations/box-patch-schema";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

interface IItems {
  name: string;
}

type FormData = z.infer<typeof boxPatchSchema>;

const AddStorage = () => {
  const router = useRouter();
  const { data: session } = useSession();
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
    resolver: zodResolver(boxPatchSchema),
    defaultValues: {
      items: [{ name: "" }]
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  // Clear the attachmentState when the component mounts
  useEffect(() => {
    setAttachmentState(new Map());
  }, [setAttachmentState]);

  // Log error
  useEffect(() => {
    console.error(errors);
  }, [errors]);

  // Set top nav action
  useEffect(() => {
    // Get url and fileName from attachmentState
    const attachments: IAttachment[] = [];
    for (const value of attachmentState.values()) {
      attachments.push({
        url: value?.metadata?.url as string,
        fileName: value.metadata?.fileName as string
      });
    }

    const submitBox = async (values: FormData) => {
      // Clean items from empty values
      const items = values.items?.filter((item) => item.name !== "");

      const data = {
        ...values,
        items,
        attachments,
        email: session?.user?.email
      };

      const res = await fetch("/api/box", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });
      const record = await res.json();

      router.replace(`/box/${record.id}`);
    };

    setTopNav({ submitAction: () => submitBox(getValues()) });
  }, [attachmentState, getValues, router, session?.user?.email, setTopNav]);

  const handleOnItemInputKeyDown = (idx: number) => {
    const items = getValues("items");
    // if items is defined
    if (items) {
      const isLastItem = idx === items.length - 1;
      const isFilled = items[idx].name !== "";

      // When last item is filled than add new item
      if (isLastItem && isFilled) append({ name: "" }, { shouldFocus: false });
    }
  };

  return (
    <MobileLayout>
      <section className="mx-auto mt-8 mb-0 flex w-[90%] max-w-4xl flex-col">
        <header className="mb-4 flex">
          <div>
            <InputField
              register={register}
              id="name"
              flavour="title"
              placeholder="Box Name"
              autoComplete="off"
            />
            <InputField
              register={register}
              id="location"
              flavour="subtitle"
              className="mt-2"
              placeholder="Box Location"
              autoComplete="off"
            />
          </div>
        </header>
        {fields.map((item, index) => (
          <div key={item.id} className="flex justify-between">
            <InputField
              register={register}
              id={`items.${index}.name` as const}
              flavour="body"
              className="py-4"
              defaultValue={item.name}
              autoComplete="off"
              onFocus={(e) =>
                (e.target.placeholder = "Type the item name clearly")
              }
              onBlur={(e) => (e.target.placeholder = "Tap here to add an item")}
              onKeyDown={() => handleOnItemInputKeyDown(index)}
              placeholder="Tap here to add an item"
            />
            {fields.length > 1 && (
              <button onClick={() => remove(index)}>
                <MinusIcon className="h-5 w-5 rounded-full bg-red-400 text-white" />
              </button>
            )}
          </div>
        ))}
        <AttachmentElement />
      </section>
    </MobileLayout>
  );
};

export default AddStorage;
