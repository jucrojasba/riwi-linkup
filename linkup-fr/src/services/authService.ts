import { IUserProviderRegister, IUserProviderLogin } from "@/app/api/interfaces/IUserProvider"; // Importing interfaces for user provider registration and login
import { IUser } from "@/UI/interfaces/IUserInterface"; // Importing the IUser interface
import fetchApi from "@/utilities/fetchApi"; // Importing a utility function for API fetching
import verifyData from "@/utilities/verifyData"; // Importing a utility function for data verification

// Function to handle user login
export async function authLoginService(user: Partial<IUser>): Promise<{ user: { name: string, email: string, token: string, roleId: number } } | { message: string } | undefined> {
    const { email, password } = user; // Destructuring email and password from user
    const dataVerify = verifyData(email, password); // Verifying data for completeness
    if (!dataVerify) {
        console.log({ message: "is necessary all params" }); // Log error if parameters are missing
        return;
    }
    const data = await fetchApi("api/auth/login", { // Sending POST request to login endpoint
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    return data; // Return the response data
}

// Function to handle user registration
export async function authRegisterService(user: Partial<IUser>): Promise<{ name: string, email: string, token: string } | { message: string } | undefined> {
    const { name, email, password, phone, sector } = user; // Destructuring user data
    const dataVerify = verifyData(name, email, password, phone, sector); // Verifying required data
    if (!dataVerify) {
        console.log({ message: "is necessary all params" }); // Log error if parameters are missing
        return;
    }
    const data = await fetchApi("/api/auth/register", { // Sending POST request to registration endpoint
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            password,
            phone,
            sector
        })
    });
    return data; // Return the response data
}

// Function to register a provider
export async function registerProviderService(name: string, email: string, image: string): Promise<IUserProviderRegister | { message: string }> {
    const data = await fetchApi("api/auth/registerProvider", { // Sending POST request to register provider
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, image })
    });
    if (!data) return data; // Return data if available
    return data; // Return the response data
}

// Function to login a provider
export async function loginProviderService(name: string, email: string, image: string): Promise<IUserProviderLogin | string> {
    const data = await fetchApi("api/auth/loginProvider", { // Sending POST request to login provider
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, image })
    });
    if (!data) return (data); // Return data if available
    const { userProvider } = data; // Destructure userProvider from response
    return userProvider; // Return the user provider data
}
