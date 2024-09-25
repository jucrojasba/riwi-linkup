import { FilterOption } from "@/UI/interfaces/Filter";

// Function to construct query parameters based on the provided filter options
export const verifyExistsQueryParams = (
    clan: FilterOption | undefined,      // Optional clan filter
    softSkill: FilterOption | undefined, // Optional soft skill filter
    techSkill: FilterOption | undefined,  // Optional technical skill filter
    language: FilterOption | undefined    // Optional language filter
): string[] => {
    let queryParams: string[] = []; // Initialize an array to hold the query parameters

    // Check if the clan filter is provided
    if (clan) {
        queryParams.push(`clanId=${clan.id}`); // Add the clan ID to the query parameters
    } 
    // Check if the soft skill filter is provided
    if (softSkill) {
        queryParams.push(`softSkillIds=${softSkill.id}`); // Add the soft skill ID to the query parameters
    }
    // Check if the technical skill filter is provided
    if (techSkill) {
        queryParams.push(`technicalSkillIds=${techSkill.id}`); // Add the technical skill ID to the query parameters
    }
    // Check if the language filter is provided
    if (language) {
        queryParams.push(`languageIds=${language.id}`); // Add the language ID to the query parameters
    }
    return queryParams; // Return the constructed array of query parameters
};
