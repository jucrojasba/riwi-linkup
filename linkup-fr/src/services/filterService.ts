import { FilterOption, FilterState } from "@/UI/interfaces/Filter";
import { ICoder } from "@/UI/interfaces/ICoderInterface";
import fetchApi from "@/utilities/fetchApi";

export async function filterService(filter:FilterState){
    const clan = filter.clans.find(clan=>clan.checked);
    const softSkill = filter.softSkills.find(softSkill => softSkill.checked);
    const techSkill = filter.techSkills.find(techSkill => techSkill.checked);
    const language = filter.languages.find(language => language.checked);
    const baseUrl:string = "https://linkupv1-production.up.railway.app/api/v3/CodersControllerV3/filter";

    //Add queryParams if exists request for filter
    const paramsQuery = verifyExistsQueryParams(clan,softSkill,techSkill,language);
    //Verify exists values on the queryParams
    if(paramsQuery.length > 0){
        const queryFilterComplete = paramsQuery.join("&");
        const urlComplete = `${baseUrl}?${queryFilterComplete}`;
        const data = await fetchApi(urlComplete);
        if(!data)return;
        const filteredCoders = data.map((coder:Partial<ICoder>)=>({
            id: coder.id!,
            urlImage: coder.urlImage!,
            name: coder.name!,
            birthday: coder.birthday!,
        }));
        return filteredCoders;
    }
}

const verifyExistsQueryParams = (clan:FilterOption | undefined, softSkill:FilterOption | undefined, techSkill:FilterOption | undefined, language:FilterOption | undefined) =>{
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
    return queryParams;
}