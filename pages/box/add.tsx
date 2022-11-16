import MobileLayout from "components/layout/mobile-layout";
import AttachmentElement from "components/ui/attachment/attachment-element";
import { attachmentAtom, IAttachment, topNavAtom } from "configs/atoms";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

interface IItems {
  name: string;
}

const AddStorage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [_, setTopNav] = useAtom(topNavAtom);
  const [attachmentState] = useAtom(attachmentAtom);

  // Ref to the input item element
  const inputItemRef = useRef<HTMLInputElement[]>([]);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [items, setItems] = useState<IItems[]>([{ name: "" }]);
  // const [attachments, setAttachments] = useState<IAttachment[]>([]);

  // useEffect(() => {
  //   let arrayOfURL = [];
  //   for (const value of attachmentState.values()) {
  //     arrayOfURL.push(value.url);
  //   }

  //   setAttachments(arrayOfURL);
  // }, [attachmentState, box?.attachments, editPage]);

  // Auto add new item
  // useEffect(() => {
  //   // add new items when the last item is not empty
  //   if (items && items.length > 0 && items[items.length - 1].name !== "") {
  //     setValue("items", [...items, { name: "" }]);
  //   }
  // }, [items]);

  // Set top nav submit button action
  useEffect(() => {
    // Get url and fileName from attachmentState
    const attachments: IAttachment[] = [];
    for (const value of attachmentState.values()) {
      attachments.push({
        url: value.url,
        fileName: value.fileName as string
      });
    }

    const submitBox = async () => {
      const data = {
        name,
        items,
        attachments,
        location,
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

    setTopNav({ submitAction: submitBox });
  }, [
    items,
    router,
    session?.user?.email,
    setTopNav,
    name,
    attachmentState,
    location
  ]);

  // add new items when the last item is not empty
  // useEffect(() => {
  //   if (items.length > 0 && items[items.length - 1].name !== "") {
  //     setItems([...items, { name: "" }]);
  //   }
  // }, [items]);

  return (
    <MobileLayout>
      <section className="mx-auto mt-8 mb-0 flex w-[90%] max-w-4xl flex-col lg:mt-32">
        <header className="mb-4 flex">
          <div>
            <input
              className="w-full border-0 bg-transparent text-4xl font-semibold leading-3 outline-none lg:text-6xl"
              type="text"
              name="box name"
              autoComplete="off"
              placeholder="Box Name"
              defaultValue=""
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="mt-2 w-full border-0 bg-transparent px-0 py-2 font-light outline-none"
              placeholder="Box Location"
              name="place"
              type="text"
              autoComplete="off"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </header>
        {items.map((item, index) => (
          <input
            key={`item-${index}`}
            ref={(el: HTMLInputElement) => (inputItemRef.current[index] = el)}
            name="items"
            value={item.name}
            onChange={(e) =>
              // update specific item
              setItems((prev) => {
                prev[index].name = e.target.value;
                return [...prev];
              })
            }
            className="bg-transparent py-4 px-0 text-lg outline-none lg:text-2xl"
            placeholder="Add item"
          />
        ))}
        <AttachmentElement />
      </section>
    </MobileLayout>
  );
};

export default AddStorage;
