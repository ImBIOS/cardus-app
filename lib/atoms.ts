import { atom } from "jotai";
import { RefObject } from "react";

export interface IImageAtom {
  progress?: number;
  status?: string;
  url?: string;
  preview?: string;
  [key: string]: string | number | undefined;
}

export type MidButtonAction = "edit" | "attachment" | "";

interface IBottomNavAtom {
  currentScreen: string;
  midButtonAction: MidButtonAction;
  [key: string]: string;
}

export const bottomNavAtom = atom<IBottomNavAtom>({
  currentScreen: "home",
  midButtonAction: "",
});

export const topNavAtom = atom({
  submitAction: () => {},
});

export const midBottomNavAtom = atom({
  animation: "",
  isAnimating: false,
  iconRotation: 0,
  onClick: () => {},
});

export const imageAtom = atom(new Map<number, IImageAtom>());

export const isLoadingAtom = atom(true);
export const isHideCreateBoxAtom = atom(true);
export const isWaitingUploadAtom = atom(false);
export const isMobileAtom = atom(false);

export const boxIdAtom = atom("");

export const componentToPrintAtom = atom<RefObject<HTMLDivElement>>({
  current: null,
});
