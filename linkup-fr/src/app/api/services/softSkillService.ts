import { ISoftSkill } from "../interfaces/ISoftSkillInterface";

// The getSoftSkillsService function retrieves a list of soft skills from the API.
// It returns an array of ISoftSkill objects or an error message if the request fails.
export async function getSoftSkillsService(): Promise<ISoftSkill[] | null | undefined | { message: string }> {
    try {
        // Sending a GET request to the API endpoint to fetch soft skills
        const response = await fetch("https://linkupv1-production.up.railway.app/api/v1/Coders/SoftSkills");

        // If the response status is not OK (2xx), throw an error
        if (!response.ok) throw new Error("Error with the response");

        // Parse and return the response body as JSON
        const data = await response.json();
        return data;
    } catch (error) {
        // Return an error message if an error occurs during the fetch or response processing
        return { message: "Error with the getSoftSkillsService" };
    }
}
