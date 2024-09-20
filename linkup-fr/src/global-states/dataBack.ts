import {create} from "zustand";

interface IData{
    id: number,
    name:string
    label:string,
    checked:boolean
}

interface IDataBackLoad{
    genders: IData[],
    clans: IData[],
    languages: IData[],
    softSkills: IData[],
    techSkills: IData[]
}

interface IDataBackLoadState{
    dataBack: IDataBackLoad,
    setDataBackLoad: (value:IDataBackLoad) => void;
}

export const useDataBackLoad = create<IDataBackLoadState>((set)=>({
    dataBack: {
        genders: [{id: 0, name:"", label: "", checked: false}],
        clans:  [{id: 0, name:"", label: "", checked: false}],
        languages: [{id: 0, name:"", label: "", checked: false}],
        softSkills:[{id: 0, name:"", label: "", checked: false}],
        techSkills: [{id: 0, name:"", label: "", checked: false}]
    },
    setDataBackLoad: (value:IDataBackLoad)=>
        set(()=>({
            dataBack: value
        }))
})) 
