import { ISoftSkill, ISoftSkills } from "@/UI/interfaces/softSkillInterface";
import fetchApi from "@/utilities/fetchApi";

export async function getSoftSkillsService():Promise<ISoftSkill[] | null>{
    const data = await fetchApi("https://linkupv1-production.up.railway.app/api/v1/Coders/SoftSkills");
    if(!data){
        console.log({message: "Error to get Soft Skills"})
        return null;
    }
    const filteredSoftSkill = data.map((softSkill: ISoftSkill) => ({
        id: softSkill.id,
        name: softSkill.name,
        label: softSkill.name,
        checked: false
    }))
    return filteredSoftSkill;
}