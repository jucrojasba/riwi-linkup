import { IUserLogin, IUserBack } from "../interfaces/IUserInterface";

// The loginService function attempts to log in a user by sending their credentials to the login API.
// It returns an IUserBack object if the login is successful, or an error message if there is a failure.
export async function loginService(user: Partial<IUserLogin>): Promise<IUserBack | { message: string }> {
    try {
        // Sending a POST request to the login API endpoint with the user's credentials
        const response = await fetch("https://linkupv1-production.up.railway.app/api/v1/Account/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Setting the content type to JSON
            },
            body: JSON.stringify(user) // Converting the user object to a JSON string for the request body
        });

        // If the response status is not OK (2xx), throw an error
        if (!response.ok) throw new Error("Error with the response");

        // Parse and return the response body as JSON
        return await response.json();
    } catch (error) {
        // Return an error message if something goes wrong during the fetch or processing
        return { message: "Error with the login" };
    }
}
