import { NextRequest, NextResponse } from "next/server";  // Importing NextRequest and NextResponse for handling HTTP requests and responses
import { verifyData } from "../utils/verifyData";          // Importing a utility function to verify input data

// Asynchronous function to handle POST requests
export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        // Destructuring required fields from the incoming request body
        const { name, email, sectorId, roleId, phoneNumber } = await req.json();
        
        // Extracting the first few characters from the name, email, and phone number
        const firstLettersName: string = name.substring(0, 3);            // First 3 letters of the name
        const firstLetterEmail: string = email.substring(0, 5);          // First 5 letters of the email
        const firstPhoneNumber: string = phoneNumber.substring(1, 4);    // Characters 2 to 4 of the phone number
        
        // Generating a random number between 0 and 9
        const numberRandom: number = Math.floor(Math.random() * 10);
        
        // Constructing a key from the extracted parts
        const key: string = `${firstLettersName}${sectorId}${firstLetterEmail}${roleId}${firstPhoneNumber}${numberRandom}`;

        // Verifying the input data
        const dataVerify = verifyData(name, email, sectorId, roleId);
        if (!dataVerify) {
            // If verification fails, return a 400 response
            return NextResponse.json({ message: "Is required all params" }, { status: 400 });
        }
        
        // If successful, return the generated key with a 201 response
        return NextResponse.json({ key }, { status: 201 });

    } catch (error) {
        // Handling any errors that occur during processing
        return NextResponse.json({ message: "Error to generate key" }, { status: 500 });
    }
}
