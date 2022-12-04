import MobileLayout from "components/layout/mobile-layout";
import Modal from "components/ui/modal";
import ThemeSwitch from "components/ui/theme-switch";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const Profile: React.FC = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const onCancel = () => setIsOpen(false);
  const onAccept = () => signOut();

  return (
    <MobileLayout>
      <section className="-mt-24 flex h-screen flex-col justify-center">
        <section className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-xl text-neutral-200">{session?.user?.name}</h1>
          <h2 className="text-md text-neutral-400">{session?.user?.email}</h2>
        </section>

        <section className="mx-auto mt-12 flex flex-col justify-center gap-4">
          <ThemeSwitch />
          <button
            className="rounded-full bg-red-400 px-4 py-2 font-semibold"
            onClick={openModal}
          >
            Sign Out
          </button>
        </section>
      </section>
      <Modal
        isOpen={isOpen}
        title="Sign Out"
        description="Are you sure you want to sign out?"
        acceptText="Sign Out"
        onCancel={onCancel}
        onAccept={onAccept}
      />
    </MobileLayout>
  );
};

export default Profile;
