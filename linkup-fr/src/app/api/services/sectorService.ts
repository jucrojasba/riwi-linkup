import { ISector } from "../interfaces/ISectorInterface";

// The getSectorsService function retrieves a list of sectors from the API.
// It returns an array of ISector objects or an error message if the request fails.
export async function getSectorsService(): Promise<ISector[] | null | undefined | { message: string }> {
    try {
        // Sending a GET request to the API endpoint to fetch sectors
        const response = await fetch("https://linkupv1-production.up.railway.app/api/v1/Sector");

        // If the response status is not OK (2xx), throw an error
        if (!response.ok) throw new Error("Error with the response");

        // Parse and return the response body as JSON
        const data = await response.json();
        return data;
    } catch (error) {
        // Return an error message if an error occurs during the fetch or response processing
        return { message: "Error with the getSectorsService" };
    }
}
