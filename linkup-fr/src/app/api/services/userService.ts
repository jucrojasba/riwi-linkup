import { IPatchUserBack } from "../interfaces/IUserInterface";

// Fetch user details based on email.
export async function getUserServiceBack(
    email: string
): Promise<{ message: string } | { incorrect: string }> {
    try {
        const response = await fetch(
            `https://linkupv1-production.up.railway.app/api/v1/User/email/${email}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error with the response: ${response.status} - ${errorMessage}`);
        }
        return await response.json();
    } catch (error) {
        return { message: "User not found" };
    }
}

// Update user details.
export async function patchUserBack(
    email: string,
    data: IPatchUserBack
): Promise<{ status: number } | { message: string }> {
    try {
        const response = await fetch(
            `https://linkupv1-production.up.railway.app/api/v1/User/${email}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) throw new Error("Error with the response");

        // Only return a status of 200 if the update is successful
        return { status: 200 };
    } catch (error) {
        return { message: "Error updating user" };
    }
}

// Delete user by email.
export async function deleteUserBack(
    email: string
): Promise<{ status: number }> {
    try {
        const response = await fetch(
            `https://linkupv1-production.up.railway.app/api/v1/User/${email}`,
            {
                method: "DELETE",
            }
        );

        if (!response.ok) throw new Error("Error with the response");

        return { status: response.status };
    } catch (error) {
        return { status: 500 }; // Return a server error status if an error occurs
    }
}

// Reset user's password.
export async function patchResetPasswordUser(
    email: string,
    password: string,
    confirmPassword: string
): Promise<{ message: string }> {
    try {
        const response = await fetch(
            `https://linkupv1-production.up.railway.app/api/v1/User/reset-password/${email}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    newPassword: password,
                    confirmPassword: confirmPassword
                })
            }
        );

        if (!response.ok) throw new Error("Error with the response");

        return await response.json();
    } catch (error) {
        return { message: "Error updating user password" };
    }
}
