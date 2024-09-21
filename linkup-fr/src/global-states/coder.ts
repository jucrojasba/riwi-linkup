import { ICoder } from "@/UI/interfaces/ICoderInterface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ICoderState {
    CodersFilter: ICoder[];
    setCodersFilter: (value: ICoder[]) => void;
}

export const useCodersFilter = create<ICoderState>()(
    persist(
        (set) => ({
            CodersFilter: [
                {
                    id: 0,
                    name: "",
                    urlImage: "",
                    birthday: ""
                }
            ],
            setCodersFilter: (value) => set(() => ({ CodersFilter: value }))
        }),
        {
            name: 'coders-filter-storage',
        }
    )
);
