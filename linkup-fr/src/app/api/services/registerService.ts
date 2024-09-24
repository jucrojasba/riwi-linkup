import { IUserRegister, IUserBack } from "../interfaces/IUserInterface";

// The registerService function is responsible for registering a new user by sending their details to the API.
// It returns an IUserBack object on success or an error message if the registration fails.
export async function registerService(user: Partial<IUserRegister>): Promise<IUserBack | { message: string }> {
    // Destructure user properties for easier access
    const { name, email, password, phone, sector } = user;
    
    try {
        // Sending a POST request to the registration API endpoint with the user's details
        const response = await fetch("https://linkupv1-production.up.railway.app/api/v1/Account/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Indicating that the request body is in JSON format
            },
            body: JSON.stringify({
                name,               // User's name
                email,              // User's email
                password,           // User's password
                phoneNumber: phone, // Mapping phone to phoneNumber as required by the API
                sectorId: sector    // Mapping sector to sectorId as required by the API
            })
        });

        // If the response status is not OK (2xx), throw an error
        if (!response.ok) throw new Error("Error with the response");

        // Parse and return the response body as JSON
        return await response.json();
    } catch (error) {
        // Return an error message if an error occurs during the fetch or response processing
        return { message: "Error to register" };
    }
}
