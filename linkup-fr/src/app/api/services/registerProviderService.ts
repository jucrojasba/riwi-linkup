import { IUserRegister, IUserBack } from "../interfaces/IUserInterface";

// The registerProvider function attempts to register a new user by sending their details to the registration API.
// It returns an IUserBack object if the registration is successful, or an error message if there is a failure.
export async function registerProvider(user: Partial<IUserRegister>): Promise<IUserBack | { message: string }> {
    // Destructure user properties for easy access
    const { name, email, password, phone, sector } = user;
    
    try {
        // Logging the user details for debugging purposes
        console.log(name, email, password, phone, sector);

        // Sending a POST request to the registration API endpoint with the user's registration details
        const response = await fetch("https://linkupv1-production.up.railway.app/api/v1/Account/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Setting the content type to JSON
            },
            body: JSON.stringify({
                name,
                email,
                password,
                phoneNumber: phone, // Mapping phone to phoneNumber for the API
                sectorId: sector // Mapping sector to sectorId for the API
            })
        });

        // Logging the response for debugging purposes
        console.log(response, "response");

        // If the response status is not OK (2xx), throw an error
        if (!response.ok) throw new Error("Error with the response");

        // Parse and return the response body as JSON
        return await response.json();
    } catch (error) {
        // Return an error message if something goes wrong during the fetch or processing
        return { message: "Error with the registerProvider" };
    }
}
