import { atom } from "jotai";

export type IAttachment = {
  fileName?: string;
  url: string;
};

export interface IAttachmentAtom {
  progress?: number;
  status?: string;
  metadata?: IAttachment;
  [key: string]: string | number | IAttachment | undefined;
}

export type MidButtonAction = "edit" | "attachment" | "";

interface IBottomNavAtom {
  currentScreen: string;
  midButtonAction: MidButtonAction;
  [key: string]: string;
}

export const bottomNavAtom = atom<IBottomNavAtom>({
  currentScreen: "home",
  midButtonAction: ""
});

export const topNavAtom = atom({
  submitAction: () => {}
});

export const midBottomNavAtom = atom({
  animation: "",
  isAnimating: false,
  iconRotation: 0,
  onClick: () => {}
});

export const attachmentAtom = atom(new Map<number, IAttachmentAtom>());

export const isLoadingAtom = atom(true);
export const isHideCreateBoxAtom = atom(true);
export const isWaitingUploadAtom = atom(false);
export const isMobileAtom = atom(false);
export const isPrintAtom = atom(false);

export const boxIdAtom = atom("");
