import { create } from 'zustand'

interface IDarkModeState{
    DarkMode:boolean;
    setDarkMode:(value:boolean)=>void;
}

export const useDarkMode = create<IDarkModeState>((set) => ({
    DarkMode:false,
    setDarkMode: (value) => set(() => ({ DarkMode:value }))
}))