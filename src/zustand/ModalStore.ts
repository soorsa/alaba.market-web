// stores/modalStore.ts
import { create } from "zustand";
import { type ReactNode } from "react";

type Theme = "light" | "dark";
interface ModalState {
  isOpen: boolean;
  content: ReactNode | null;
  title?: string;
  theme?: Theme;
  openModal: (content: ReactNode, title?: string, theme?: Theme) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  content: null,
  title: "",
  theme: "light",
  openModal: (content, title, theme) =>
    set({ theme, title, isOpen: true, content }),
  closeModal: () => set({ isOpen: false, content: null }),
}));
