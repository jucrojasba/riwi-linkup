import { NextRequest, NextResponse } from "next/server"; // Importing modules for request and response handling
import { sendEmailService } from "../services/emailService"; // Importing the email sending service

// Asynchronous function to handle POST requests
export async function POST(req: NextRequest): Promise<NextResponse> {
    const { email, emailLinkUp, subject, text, html } = await req.json(); // Extracting email details from the request body

    // Calling the email service to send the email
    const data = await sendEmailService(email, emailLinkUp, subject, text);

    // Checking if the email sending failed
    if (!data || data.message === "Error to send message email") {
        return NextResponse.json({ data }, { status: 500 }); // Returning a 500 error if there's an issue sending the email
    }

    return NextResponse.json({ data }, { status: 201 }); // Returning the response data with a 201 status on success
}
