import { IClan } from "../interfaces/IClanInterface";

// This function fetches the list of clans from an external API
// It returns either an array of clans (IClan[]), null, undefined, or an error message object
export async function getClansService(): Promise<IClan[] | null | undefined | { message: string }> {
    try {
        // Sends a GET request to the external API to fetch clans
        const response = await fetch("https://linkupv1-production.up.railway.app/api/v1/Coders/Clans");

        // If the response status is not OK (e.g., 404, 500), throw an error
        if (!response.ok) throw new Error("Error with the response");

        // Parse the response as JSON data
        const data = await response.json();

        // Return the fetched data (clans array)
        return data;

    } catch (error) {
        // In case of any error (network issue, invalid response, etc.), return an error message object
        return ({ message: "Error with the getClansService" });
    }
}
