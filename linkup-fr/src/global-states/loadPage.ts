import { create } from 'zustand'

interface ILoadPage{
    load:boolean;
    setLoad:(value:boolean)=>void;
}

export const useLoadPage = create<ILoadPage>((set) => ({
    load:false,
    setLoad: (value) => set(() => ({ load:value }))
}))

