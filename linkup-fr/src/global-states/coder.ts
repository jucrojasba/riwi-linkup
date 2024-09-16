import { ICoder } from "@/UI/interfaces/ICoderInterface";
import {create} from "zustand";

interface ICoderState{
    CodersFilter:ICoder[];
    setCodersFilter:(value:ICoder[])=>void;
}

export const useCodersFilter = create<ICoderState>((set)=>({
    CodersFilter: [
        {
            id:0,
            name: "",
            urlImage: "",
            birthday: ""
        }
    ],
    setCodersFilter: (value) => set(()=>({CodersFilter:value}))
}))