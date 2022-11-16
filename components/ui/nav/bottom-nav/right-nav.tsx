import { UserCircleIcon } from "@heroicons/react/24/solid";
import { bottomNavAtom } from "configs/atoms";
import rgbDataURL from "helpers/image-placeholder";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const RightNav = () => {
  const { data: session } = useSession();
  const [{ currentScreen }] = useAtom(bottomNavAtom);

  return (
    <Link href="/profile" className="relative h-12 w-12">
      {session?.user?.image ? (
        <Image
          className={`rounded-full object-cover ${
            currentScreen === "profile" && "border-4 border-blue-400"
          }`}
          src={session.user.image}
          fill
          placeholder="blur"
          blurDataURL={rgbDataURL(96, 165, 250)}
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
  );
};

export default RightNav;
