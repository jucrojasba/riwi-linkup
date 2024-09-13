import { create } from 'zustand'

interface ILanguageState{
    language:boolean;
    setLanguage:(value:boolean)=>void;
}

export const useLanguage = create<ILanguageState>((set) => ({
    language:false,
    setLanguage: (value) => set(() => ({ language:value }))
}))

