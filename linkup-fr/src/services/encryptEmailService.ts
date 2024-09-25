import fetchApi from "@/utilities/fetchApi"; // Importing the fetchApi utility for making API calls

// This function encrypts an email address by sending it to the "/api/encryptEmail" endpoint
export async function encryptEmailService(email: string): Promise<{ encryptedEmail: string; iv: string } | { message: string }> {
    // Making the API call to encrypt the email
    const apiFetch = await fetchApi("/api/encryptEmail", {
        method: "POST", // Setting the request method to POST
        headers: {
            "Content-Type": "application/json" // Specifying that we're sending JSON data
        },
        body: JSON.stringify(email) // Stringifying the email string to send as the request body
    });
    
    // Logging the response from the API for debugging purposes
    console.log("apiFetch", apiFetch);

    // Checking if the response contains a message, indicating an error
    if (apiFetch && "message" in apiFetch) {
        return apiFetch; // Returning the error message if it exists
    }

    // Returning the response containing the encrypted email and IV if no errors
    return apiFetch; 
}

// This function decrypts an encrypted email using the "/api/decryptEmail" endpoint
export async function decryptEmailService(encryptedEmail: string, iv: string): Promise<{ email: string } | { message: string }> {
    // Making the API call to decrypt the email
    const response = await fetch("/api/decryptEmail", {
        method: "POST", // Setting the request method to POST
        headers: {
            "Content-Type": "application/json" // Specifying that we're sending JSON data
        },
        body: JSON.stringify({ email: encryptedEmail, iv }) // Stringifying the encrypted email and IV to send as the request body
    });

    // Parsing the JSON response from the API
    const data = await response.json();
    return data; // Returning the decrypted email or message received from the API
}
