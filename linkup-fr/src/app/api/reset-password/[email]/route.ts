import { NextRequest, NextResponse } from "next/server"; // Importing necessary Next.js modules for handling requests and responses
import { patchResetPasswordUser } from "../../services/userService"; // Importing the service for resetting a user's password

export async function PATCH(req: NextRequest, { params }: { params: { email: string } }): Promise<NextResponse> {
    try {
        const { email } = params; // Extracting email from the URL parameters

        // Checking if email is provided, otherwise return a 400 status code
        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        // Parsing the request body to extract the password and confirmPassword
        const { password, confirmPassword } = await req.json();

        // Checking if both password and confirmPassword are provided, otherwise return a 400 status code
        if (!password || !confirmPassword) {
            return NextResponse.json({ message: "Password and confirmPassword are required" }, { status: 400 });
        }

        // Calling the service to reset the user's password
        const userUpdate = await patchResetPasswordUser(email, password, confirmPassword);

        // Returning the updated user data with a 200 status code
        return NextResponse.json(userUpdate, { status: 200 });
    } catch (error) {
        // If an error occurs, return a 500 status code with an error message
        return NextResponse.json({ message: "Error with the reset-password" }, { status: 500 });
    }
}
