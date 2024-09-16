import { ITechicalSkill, ITechicalSkills } from "@/UI/interfaces/technicalSkillInterface";
import fetchApi from "@/utilities/fetchApi";

export async function getTechnicalSkillsService():Promise<ITechicalSkill[] | null>{
    const data = await fetchApi("https://linkupv1-production.up.railway.app/api/v1/Coders/TechnicalSkills");
    if(!data){
        console.log({message: "Error to get technical skills"})
        return null;
    }
    const filteredTechSkill = data.map((techSkill: ITechicalSkill) => ({
        id: techSkill.id,
        name: techSkill.name,
        label: techSkill.name,
        checked: false
    }))
    return filteredTechSkill;
}