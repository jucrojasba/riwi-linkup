import { ISoftSkill } from "@/UI/interfaces/softSkillInterface"; // Importing the ISoftSkill interface for type definitions
import fetchApi from "@/utilities/fetchApi"; // Importing the fetchApi utility for making API calls

// This function retrieves a list of soft skills from the API
export async function getSoftSkillsService(): Promise<ISoftSkill[] | null> {
    // Making the API call to fetch soft skills
    const softSkills = await fetchApi("api/softSkills");

    // Checking if the response is null or undefined
    if (!softSkills) {
        console.log({ message: "Error to get Soft Skills" }); // Logging an error message for debugging
        return null; // Returning null if there was an error fetching soft skills
    }

    // Mapping the retrieved soft skill data to create an array of filtered soft skills
    const filteredSoftSkill = softSkills.data.map((softSkill: Partial<ISoftSkill>) => ({
        id: softSkill.id, // Extracting the soft skill ID
        name: softSkill.name, // Extracting the soft skill name
        label: softSkill.name, // Setting the label to the soft skill name (could be used for UI display)
        checked: false // Initializing the checked property to false
    }));

    return filteredSoftSkill; // Returning the array of filtered soft skills
}
