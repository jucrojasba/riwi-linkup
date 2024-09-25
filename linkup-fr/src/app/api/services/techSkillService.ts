import { ITechSkill } from "../interfaces/ITechSkillInterface";

// The getTechSkillsService function retrieves a list of technical skills from the API.
// It returns an array of ITechSkill objects or an error message if the request fails.
export async function getTechSkillsService(): Promise<ITechSkill[] | null | undefined | { message: string }> {
    try {
        // Sending a GET request to the API endpoint to fetch technical skills
        const response = await fetch("https://linkupv1-production.up.railway.app/api/v1/Coders/TechnicalSkills");

        // If the response status is not OK (2xx), throw an error
        if (!response.ok) throw new Error("Error with the response");

        // Parse and return the response body as JSON
        const data = await response.json();
        return data;
    } catch (error) {
        // Return an error message if an error occurs during the fetch or response processing
        return { message: "Error with the getTechSkillsService" };
    }
}
