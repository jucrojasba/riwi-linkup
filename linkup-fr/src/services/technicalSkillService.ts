import { ITechicalSkill, ITechicalSkills } from "@/UI/interfaces/technicalSkillInterface"; // Importing interfaces for technical skill types
import fetchApi from "@/utilities/fetchApi"; // Importing the fetchApi utility for making API calls

// This function retrieves a list of technical skills from the API
export async function getTechnicalSkillsService(): Promise<ITechicalSkill[] | null> {
    // Making the API call to fetch technical skills
    const techSkills = await fetchApi("api/techSkills");

    // Checking if the response is null or undefined
    if (!techSkills) {
        console.log({ message: "Error to get technical skills" }); // Logging an error message for debugging
        return null; // Returning null if there was an error fetching technical skills
    }

    // Mapping the retrieved technical skill data to create an array of filtered technical skills
    const filteredTechSkill = techSkills.data.map((techSkill: Partial<ITechicalSkill>) => ({
        id: techSkill.id, // Extracting the technical skill ID
        name: techSkill.name, // Extracting the technical skill name
        label: techSkill.name, // Setting the label to the technical skill name (could be used for UI display)
        checked: false // Initializing the checked property to false
    }));

    return filteredTechSkill; // Returning the array of filtered technical skills
}
