import { create } from 'zustand'

interface ISpanishState{
    Spanish:boolean;
    setSpanish:(value:boolean)=>void;
}

export const useSpanish = create<ISpanishState>((set) => ({
    Spanish:false,
    setSpanish: (value) => set(() => ({ Spanish:value }))
}))

