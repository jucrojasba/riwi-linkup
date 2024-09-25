import { IGenerateKey } from "@/UI/interfaces/IGenerateKeyInterface"; // Importing the IGenerateKey interface for type definitions
import fetchApi from "@/utilities/fetchApi"; // Importing the fetchApi utility for making API calls

// This function generates a key by sending a request to the API
export async function generateKeyService(data: IGenerateKey): Promise<{ key: string }> {
    // Making the API call to generate keys
    const apiFetch = await fetchApi("api/generateKeys", {
        method: "POST", // Setting the request method to POST
        headers: {
            "Content-Type": "application/json" // Specifying that we're sending JSON data
        },
        body: JSON.stringify(data) // Stringifying the data to send it in the request body
    });

    // Checking if the response contains a message, indicating an error
    if (apiFetch && "message" in apiFetch) {
        return apiFetch; // Returning the error message if it exists
    }

    // Returning the API response which should contain the generated key
    return apiFetch;
}
