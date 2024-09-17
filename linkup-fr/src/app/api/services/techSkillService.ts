import { ITechSkill } from "../interfaces/ITechSkillInterface";

export async function getTechSkillsService():Promise<ITechSkill[] | null | undefined | {message: string}>{
    try{
        const response = await fetch("https://linkupv1-production.up.railway.app/api/v1/Coders/TechnicalSkills");
        if(!response.ok) throw new Error("Error with the response");
        const data = await response.json();
        return data;
    }catch(error){
        return ({message: "Error with the getTechSkillsService"})
    }
}