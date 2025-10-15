import { create } from "zustand";

type User = {
  id: string;
  name: string;
  username: string;
};

type SimpleStore = {
  menu: string;
  setMenu: (menu: string) => void;
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useStore = create<SimpleStore>((set) => ({
  menu: "Home",
  setMenu: (chooseMenu: string) =>
    set({
      menu: chooseMenu,
    }),
  user: null,
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),
}));
