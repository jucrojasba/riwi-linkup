// Interface representing a filter query for fetching or searching coders
export interface FilterQuery {
    clanId?: string; // Optional clan ID to filter coders by their clan
    softSkillIds?: string; // Optional string of soft skill IDs to filter coders by their soft skills
    technicalSkillIds?: string; // Optional string of technical skill IDs to filter coders by their technical skills
    languageIds?: string; // Optional string of language IDs to filter coders by their language proficiencies
}
