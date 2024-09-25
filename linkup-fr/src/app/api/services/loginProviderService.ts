import { IUserLogin, IUserBack } from "../interfaces/IUserInterface";

// This function attempts to log a user in by sending their credentials to the login API.
// It returns an IUserBack object if successful, or an error message if unsuccessful.
export async function loginProvider(user: Partial<IUserLogin>): Promise<IUserBack | { message: string }> {
    try {
        // Sending a POST request to the login API endpoint
        const response = await fetch("https://linkupv1-production.up.railway.app/api/v1/Account/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Indicating the content type is JSON
            },
            body: JSON.stringify(user) // Sending the user object as JSON
        });

        // If the response is not OK (status code not in 200-299), throw an error
        if (!response.ok) throw new Error("Error with the response");

        // Parse and return the response as JSON, expected to conform to IUserBack
        return await response.json();

    } catch (error) {
        // In case of an error, return a message indicating the failure
        return { message: "Error with the loginProvider" };
    }
}
