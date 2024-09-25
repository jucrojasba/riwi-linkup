import { ILanguage } from "../interfaces/ILanguageInterface";

// This function fetches language data from an API endpoint.
// It returns an array of ILanguage objects, or a message in case of an error.
export async function getLanguagesService(): Promise<ILanguage[] | null | undefined | { message: string }> {
    try {
        // Fetching data from the given API endpoint
        const response = await fetch("https://linkupv1-production.up.railway.app/api/v1/Coders/Languages");
        
        // If the response status is not OK (status code not 200-299), throw an error
        if (!response.ok) throw new Error("Error with the response");
        
        // Parse the response as JSON
        const data = await response.json();
        
        // Return the parsed data (assumed to be an array of ILanguage objects)
        return data;
        
    } catch (error) {
        // In case of an error, return a message indicating failure
        return { message: "Error with the getLanguagesService" };
    }
}
