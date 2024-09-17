import { ISoftSkill } from "@/UI/interfaces/softSkillInterface";
import fetchApi from "@/utilities/fetchApi";

export async function getSoftSkillsService():Promise<ISoftSkill[] | null>{
    const softSkills = await fetchApi("api/softSkills");
    if(!softSkills){
        console.log({message: "Error to get Soft Skills"})
        return null;
    }
    const filteredSoftSkill = softSkills.data.map((softSkill: Partial<ISoftSkill>) => ({
        id: softSkill.id,
        name: softSkill.name,
        label: softSkill.name,
        checked: false
    }))
    return filteredSoftSkill;
}