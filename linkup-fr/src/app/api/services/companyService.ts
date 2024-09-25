// This function retrieves the number of companies added in the current month from the backend.
// It returns either the number of companies, undefined (if there's no response), 
// or an error message in case of a failure.
export async function getCompaniesByMonth(): Promise<number | undefined | { message: string }> {
    try {
        // Fetch the data from the specified API endpoint
        const response = await fetch('https://linkupv1-production.up.railway.app/api/Dashboard/companies-by-month');
        
        // If the response is not successful (status code not in 2xx range), throw an error
        if (!response.ok) throw new Error("Error with the response");
        
        // Parse the JSON response
        const data = await response.json();
        
        // Return the parsed data (expected to be the number of companies added this month)
        return data;
    } catch (error) {
        // If an error occurs during the request, return an error message
        return ({ message: "Error with the getCompaniesByMonth" });
    }
}
