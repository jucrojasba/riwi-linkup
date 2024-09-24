// This function fetches the number of frontend coders from an external API
// It returns either a number, undefined, or an error message object
export async function getCodersFrontendService(): Promise<number | undefined | { message: string }> {
    try {
        // Sends a GET request to the external API to fetch the frontend coders count
        const response = await fetch("https://linkupv1-production.up.railway.app/api/Dashboard/frontend-coders");

        // If the response status is not OK (e.g., 404, 500), throw an error
        if (!response.ok) throw new Error("Error with the response");

        // Parse the response as JSON data
        const data = await response.json();

        // Return the data, which is expected to be a number (count of frontend coders)
        return data;

    } catch (error) {
        // In case of any error (network issue, invalid response, etc.), return an error message object
        return ({ message: "Error with the getCodersFrontendService" });
    }
}
