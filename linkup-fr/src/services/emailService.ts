import { IEmail } from "@/UI/interfaces/emailInterface"; // Importing the IEmail interface for type definition
import fetchApi from "@/utilities/fetchApi"; // Importing the fetchApi utility for making API calls

// This function sends an email using a POST request to the "api/emails" endpoint
export async function emailService(email: Partial<IEmail>): Promise<string> {
    try {
        // Making the API call to send the email with the provided data
        const data = await fetchApi("api/emails", {
            method: "POST", // Setting the request method to POST
            headers: {
                "Content-Type": "application/json" // Specifying that we're sending JSON data
            },
            body: JSON.stringify(email) // Stringifying the email object to send as the request body
        });

        // Returning the response data received from the API
        return data; // This could be modified based on the expected response structure
    } catch (error) {
        // Handling any errors that occur during the API call
        console.error("Error sending email:", error); // Logging the error for debugging purposes
        throw new Error("Failed to send email."); // Throwing a new error with a descriptive message
    }
}

