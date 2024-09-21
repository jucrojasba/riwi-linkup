import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IExpandState {
    expand: boolean;
    setExpand: (value: boolean) => void;
}

export const useExpand = create<IExpandState>()(
    persist(
        (set) => ({
            expand: true,
            setExpand: (value: boolean) => set(() => ({ expand: value }))
        }),
        {
            name: 'expand-storage',
        }
    )
);
