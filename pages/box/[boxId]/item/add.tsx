import { MinusIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import InputField from "components/form/input-field";
import ImagePreview from "components/image/image-preview";
import MobileLayout from "components/layouts/mobile-layout";
import { useAtom } from "jotai";
import { imageAtom, topNavAtom } from "lib/atoms";
import { itemCreateSchema } from "lib/validations/item/item-create-schema";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof itemCreateSchema>;

const AddStorage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [_, setTopNav] = useAtom(topNavAtom);
  const [imageState, setImageState] = useAtom(imageAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
    reset,
    trigger,
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(itemCreateSchema),
    defaultValues: {
      keywords: [{ name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "keywords",
  });

  // Auto label preview image with Tensorflow/MobileNet
  useEffect(() => {
    for (const [key, value] of imageState) {
      const img = new Image();
      img.src = value.preview as string;
      img.onload = async () => {
        // Load the model.
        const model = await mobilenet.load({ version: 2, alpha: 0.5 });

        // Classify the image.
        const predictions = await model.classify(img);
        const keywords = getValues("keywords");
        for (const prediction of predictions) {
          const isAlreadyAvailable = keywords?.find(
            (keyword) => keyword.name === prediction.className
          );

          if (isAlreadyAvailable) continue;

          append({ name: prediction.className });
        }
      };
    }
  }, [append, getValues, imageState]);

  // Clear the attachmentState when the component mounts
  useEffect(() => {
    setImageState(new Map());
  }, [setImageState]);

  // Log error
  useEffect(() => {
    console.error(errors);
  }, [errors]);

  // Set top nav action
  useEffect(() => {
    // Get url from imageState
    const images: string[] = [];
    for (const value of imageState.values()) {
      images.push(value?.url as string);
    }

    const submitItem = async (values: FormData) => {
      // Clean items from empty values
      const keywords = values.keywords?.filter(
        (keyword) => keyword.name !== ""
      );

      const data = {
        ...values,
        keywords,
        images,
        boxId: router.query.boxId as string,
      };

      const res = await fetch("/api/item", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      const record = await res.json();

      if (record) router.back();
    };

    setTopNav({ submitAction: () => submitItem(getValues()) });
  }, [imageState, getValues, router, session?.user?.email, setTopNav]);

  const handleOnItemInputKeyDown = (idx: number) => {
    const keywords = getValues("keywords");

    // if items is defined
    if (keywords) {
      const isLastItem = idx === keywords.length - 1;
      const isFilled = keywords[idx].name !== "";

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
              placeholder="Item Name"
              autoComplete="off"
            />
            <InputField
              id="location"
              flavour="subtitle"
              className="mt-2"
              placeholder="Item Location"
              autoComplete="off"
              defaultValue={`Box ID: ${router.query.boxId}`}
              readOnly
            />
          </div>
        </header>
        {fields.map((keyword, index) => (
          <div key={keyword.id} className="flex justify-between">
            <InputField
              register={register}
              id={`keywords.${index}.name` as const}
              flavour="body"
              className="py-4"
              defaultValue={keyword.name}
              autoComplete="off"
              onFocus={(e) => (e.target.placeholder = "Type the keyword")}
              onBlur={(e) =>
                (e.target.placeholder = "Tap here to add a keyword or label")
              }
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
        <ImagePreview />
      </section>
    </MobileLayout>
  );
};

export default AddStorage;
