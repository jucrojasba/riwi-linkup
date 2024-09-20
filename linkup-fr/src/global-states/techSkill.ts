import {create} from "zustand";

interface ITechSkillState {
    techSkill:string | undefined;
    setTechSkill:(value:string | undefined)=>void | undefined;
}

export const useTechSkill = create<ITechSkillState>((set)=>({
    techSkill: "",
    setTechSkill: (value:string | undefined) => set(()=>({techSkill:value}))
}))