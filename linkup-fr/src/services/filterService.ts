import { FilterState } from "@/UI/interfaces/Filter";
import fetchApi from "@/utilities/fetchApi";

export async function filterService(filter:FilterState):Promise<void>{
    console.log("filters", filter);
    const clan = filter.clans.find(clan=>clan.checked);
    const softSkill = filter.softSkills.find(softSkill => softSkill.checked);
    const techSkill = filter.techSkills.find(techSkill => techSkill.checked);
    const language = filter.languages.find(language => language.checked);
    const baseUrl:string = "https://linkupv1-production.up.railway.app/api/v3/CodersControllerV3/filter";
    let queryParams:string[] = [];

    if(clan){
        queryParams.push(`clanId=${clan?.id}`);
    }
    if (softSkill) {
        queryParams.push(`softSkillIds=${softSkill.id}`);
    }
    if (techSkill) {
        queryParams.push(`technicalSkillIds=${techSkill.id}`);
    }
    if (language) {
        queryParams.push(`languageIds=${language.id}`);
    }

    if(queryParams.length > 0){
        const queryFilterComplete = queryParams.join("&");
        const urlComplete = `${baseUrl}?${queryFilterComplete}`;
        console.log("Fetch url: ", urlComplete);
        return await fetchApi(urlComplete);
    }
}