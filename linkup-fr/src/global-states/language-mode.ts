import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ILanguageState {
  language: boolean;
  setLanguage: (value: boolean) => void;
}

export const useLanguage = create<ILanguageState>()(
  persist(
    (set) => ({
      language: false,
      setLanguage: (value) => set({ language: value }),
    }),
    {
      name: 'language-storage',
    }
  )
);
