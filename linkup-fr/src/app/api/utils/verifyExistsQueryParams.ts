import { FilterOption } from "@/UI/interfaces/Filter";

export const verifyExistsQueryParams = (
    clan: FilterOption | undefined, 
    softSkill: FilterOption | undefined, 
    techSkill: FilterOption | undefined, 
    language: FilterOption | undefined
) => {
    let queryParams: string[] = [];
    if (clan) {
        queryParams.push(`clanId=${clan.id}`);
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
};