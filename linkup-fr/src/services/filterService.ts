import { FilterOption, FilterState } from "@/UI/interfaces/Filter"; // Importing interfaces for filter options and state
import { ICoder } from "@/UI/interfaces/ICoderInterface"; // Importing the ICoder interface for type definitions
import fetchApi from "@/utilities/fetchApi"; // Importing the fetchApi utility for making API calls

// This function filters coders based on selected options from the filter state
export async function filterService(filter: FilterState) {
    console.log("frontend"); // Logging to indicate that the frontend is processing

    // Finding the selected options from the filter state
    const clan = filter.clans.find(clan => clan.checked);
    const softSkill = filter.softSkills.find(softSkill => softSkill.checked);
    const techSkill = filter.techSkills.find(techSkill => techSkill.checked);
    const language = filter.languages.find(language => language.checked);
    
    const baseUrl: string = "/api/filters"; // Base URL for the API

    // Add query parameters if any of the filters exist
    const paramsQuery = verifyExistsQueryParams(clan, softSkill, techSkill, language);
    
    // Verify if there are any values in the query parameters
    if (paramsQuery.length > 0) {
        // Joining the query parameters into a string
        const queryFilterComplete = paramsQuery.join("&");
        
        // Making the API call to filter coders
        const data = await fetchApi("/api/coders/filter", {
            method: "POST", // Setting the request method to POST
            headers: {
                "Content-Type": "application/json" // Specifying that we're sending JSON data
            },
            body: JSON.stringify({
                queryFilterComplete // Sending the query parameters in the request body
            })
        });
        
        // If no data is returned, exit the function
        if (!data) return;
        
        // Mapping the returned data to create an array of filtered coders
        const filteredCoders = data.map((coder: Partial<ICoder>) => ({
            id: coder.id!, // Using non-null assertion as we expect these fields to exist
            urlImage: coder.urlImage!,
            name: coder.name!,
            birthday: coder.birthday!,
        }));
        
        return filteredCoders; // Returning the array of filtered coders
    }
}

// This function constructs query parameters based on the selected filter options
const verifyExistsQueryParams = (
    clan: FilterOption | undefined, 
    softSkill: FilterOption | undefined, 
    techSkill: FilterOption | undefined, 
    language: FilterOption | undefined
) => {
    let queryParams: string[] = []; // Array to hold the query parameters

    // Adding clan ID to the query parameters if a clan is selected
    if (clan) {
        queryParams.push(`clanId=${clan?.id}`);
    }
    // Adding soft skill IDs to the query parameters if a soft skill is selected
    if (softSkill) {
        queryParams.push(`softSkillIds=${softSkill.id}`);
    }
    // Adding technical skill IDs to the query parameters if a tech skill is selected
    if (techSkill) {
        queryParams.push(`technicalSkillIds=${techSkill.id}`);
    }
    // Adding language IDs to the query parameters if a language is selected
    if (language) {
        queryParams.push(`languageIds=${language.id}`);
    }
    
    return queryParams; // Returning the array of query parameters
}
