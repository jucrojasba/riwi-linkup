// This function retrieves the number of coders currently in training from the backend.
// It returns either the number of coders, undefined (if there's no response),
// or an error message in case of a failure.
export async function getCoderTrainingService(): Promise<number | undefined | { message: string }> {
    try {
        // Fetch the data from the specified API endpoint
        const response = await fetch("https://linkupv1-production.up.railway.app/api/Dashboard/coders-in-training");
        
        // If the response is not successful (not 2xx), throw an error
        if (!response.ok) throw new Error("Error with the response");
        
        // Parse the JSON response
        const data = await response.json();
        
        // Log the received data for debugging purposes
        console.log('data servicio', data);
        
        // Return the parsed data (expected to be the number of coders in training)
        return data;
    } catch (error) {
        // If there's an error, return a message indicating the issue
        return ({ message: "Error with the getCoderTrainingService" });
    }
}
