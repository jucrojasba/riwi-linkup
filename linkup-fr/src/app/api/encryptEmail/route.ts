import { NextRequest, NextResponse } from "next/server"; // Importing modules to handle requests and responses
import { encryptEmail } from "../utils/encryptEmail"; // Importing a utility function for email encryption

// Asynchronous function to handle POST requests
export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const email = await req.json(); // Extracting the email from the request body
        console.log("email-back", email); // Logging the received email

        if (!email) { // Checking if the email is provided
            return NextResponse.json({ message: "Email is required" }, { status: 400 }); // Returning a 400 error if email is missing
        }

        // Calling the encryption function
        const { encryptedEmail, iv } = encryptEmail(email); // Encrypting the email and obtaining the encrypted value and IV
        console.log("dasdasdasd", encryptedEmail, "dadasdasdasdad", iv); // Logging the encrypted email and IV

        return NextResponse.json({ encryptedEmail, iv }, { status: 200 }); // Returning the encrypted email and IV with a 200 status
    } catch (error) {
        console.error("Error in POST /api/encryptEmail:", error); // Logging any errors that occur
        return NextResponse.json({ message: "Error processing request" }, { status: 500 }); // Returning a 500 error if an exception occurs
    }
}
