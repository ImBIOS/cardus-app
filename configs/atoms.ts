import { atom } from "jotai";

export type IAttachment = {
  fileName?: string;
  url?: string;
};

interface IAttachmentAtom {
  progress?: number;
  url?: string;
  status?: string;
  preview?: IAttachment;
  [key: string]: string | number | IAttachment | undefined;
}

export const bottomNavAtom = atom({
  currentScreen: "home"
});

export const topNavAtom = atom({
  submitAction: () => {}
});

// const searchAtom = atom({
//   query: ""
// });

export const midBottomNavAtom = atom({
  animation: "",
  isAnimating: false,
  iconRotation: 0,
  onClick: () => {}
});

export const attachmentAtom = atom(new Map<number, IAttachmentAtom>());

export const isWaitingUploadAtom = atom(false);

// export const attachmentAtom = atom<IAttachmentAtom[]>([]);

export const isMobileAtom = atom(false);
