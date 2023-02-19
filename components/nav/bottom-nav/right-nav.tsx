import {
  QrCodeIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import ComponentToPrint from "components/component-to-print";
import Tooltip from "components/tooltip";
import { useAtom } from "jotai";
import { bottomNavAtom, boxIdAtom, componentToPrintAtom } from "lib/atoms";
import useImagePlaceholder from "lib/hooks/use-image-placeholder";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";

const RightNav = () => {
  const imagePlaceholder = useImagePlaceholder();
  const { data: session } = useSession();
  const [boxId] = useAtom(boxIdAtom);
  const [componentToPrint] = useAtom(componentToPrintAtom);
  const [{ currentScreen, midButtonAction }] = useAtom(bottomNavAtom);

  const randomTooltipText = () => {
    const text = [
      "🤔 What is this?",
      "🐛 Is it a bug?",
      "😋 I wonder this...",
      "🏃 I'm running to...",
    ];

    return text[Math.floor(Math.random() * text.length)];
  };

  const handleComponentPrint = useReactToPrint({
    content: () => componentToPrint.current as HTMLDivElement,
  });

  // Set QR code
  const [qr, setQR] = useState("");
  useEffect(() => {
    if (boxId) {
      QRCode.toDataURL(boxId)
        .then((url) => {
          setQR(url);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [boxId]);

  return (
    <>
      {midButtonAction === "" && (
        <Link href="/profile" className="relative h-12 w-12">
          {session?.user?.image ? (
            <Image
              className={`rounded-full object-cover ${
                currentScreen === "profile" && "border-4 border-blue-400"
              }`}
              src={session.user.image}
              fill
              placeholder="blur"
              blurDataURL={imagePlaceholder}
              sizes="100%"
              alt="user avatar"
            />
          ) : (
            <UserCircleIcon
              className={`h-10 w-10 ${
                currentScreen === "profile" && "text-blue-400"
              }`}
            />
          )}
        </Link>
      )}
      {midButtonAction === "edit" && (
        <>
          <QrCodeIcon className="h-10 w-10" onClick={handleComponentPrint} />
          {qr && (
            <div className="hidden">
              <ComponentToPrint qr={qr} />
            </div>
          )}
        </>
      )}
      {midButtonAction === "attachment" && (
        <Tooltip text={randomTooltipText()}>
          <QuestionMarkCircleIcon className="h-10 w-10 text-neutral-400" />
        </Tooltip>
      )}
    </>
  );
};

export default RightNav;
