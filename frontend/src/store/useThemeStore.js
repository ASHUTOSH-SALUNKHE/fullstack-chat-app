import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "night",
  
  setTheme: (t) => {
    localStorage.setItem("chat-theme", t);
    set({ theme : t });
  },
}));