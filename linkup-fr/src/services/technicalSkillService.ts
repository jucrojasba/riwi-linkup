import { ITechicalSkill, ITechicalSkills } from "@/UI/interfaces/technicalSkillInterface";
import fetchApi from "@/utilities/fetchApi";

export async function getTechnicalSkillsService():Promise<ITechicalSkill[] | null>{
    const techSkills = await fetchApi("api/techSkills");
    if(!techSkills){
        console.log({message: "Error to get technical skills"})
        return null;
    }
    const filteredTechSkill = techSkills.data.map((techSkill: Partial<ITechicalSkill>) => ({
        id: techSkill.id,
        name: techSkill.name,
        label: techSkill.name,
        checked: false
    }))
    return filteredTechSkill;
}