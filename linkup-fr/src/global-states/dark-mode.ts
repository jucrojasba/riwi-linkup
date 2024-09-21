import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IDarkModeState {
  DarkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export const useDarkMode = create<IDarkModeState>()(
  persist(
    (set) => ({
      DarkMode: false,
      setDarkMode: (value) => set({ DarkMode: value }),
    }),
    {
      name: 'dark-mode-storage', 
    }
  )
);
