import { NextRequest, NextResponse } from "next/server"; // Importing modules for handling requests and responses
import { decryptEmail } from "../utils/encryptEmail"; // Importing the email decryption utility function

// Asynchronous function to handle POST requests
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { email, iv } = await req.json(); // Extracting email and IV from the request body

    // Decoding the email and IV from URI components
    const decodedEmail = decodeURIComponent(email);
    const decodedIv = decodeURIComponent(iv);

    // Checking if both decodedEmail and decodedIv are provided
    if (!decodedEmail || !decodedIv) {
      return NextResponse.json({ message: "Email and IV are required" }, { status: 400 }); // Return 400 if missing
    }

    // Calling the decryptEmail function to decrypt the provided email
    const emailDecrypted = decryptEmail(decodedEmail, decodedIv);
    
    // Checking if decryption was unsuccessful
    if (!emailDecrypted) {
      return NextResponse.json({ message: "Error decrypting email" }, { status: 500 }); // Return 500 on error
    }

    // Returning the decrypted email with a 200 status
    return NextResponse.json({ email: emailDecrypted }, { status: 200 });
  } catch (error) {
    // Logging the error and returning a 500 response on failure
    console.error("Error in POST /api/decrypt-email:", error);
    return NextResponse.json({ message: "Error processing request" }, { status: 500 });
  }
}
