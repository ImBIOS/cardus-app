import { atom } from "jotai";
import { RefObject } from "react";

// Types
export type MidButtonAction = "edit" | "attachment" | "";

// Interfaces
export interface IImageAtom {
  progress?: number;
  status?: string;
  url?: string;
  preview?: string;
  [key: string]: string | number | undefined;
}

interface IBottomNavAtom {
  currentScreen: string;
  midButtonAction: MidButtonAction;
  [key: string]: string;
}

// Object Atoms
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

// Map Atoms
export const imageAtom = atom(new Map<number, IImageAtom>());

// Boolean Atoms
export const isLoadingAtom = atom(true);
export const isHideCreateBoxAtom = atom(true);
export const isWaitingUploadAtom = atom(false);
export const isMobileAtom = atom(false);

// String Atoms
export const boxIdAtom = atom("");

// RefObject Atoms
export const componentToPrintAtom = atom<RefObject<HTMLDivElement>>({
  current: null,
});
