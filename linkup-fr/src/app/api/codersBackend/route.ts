import { NextRequest, NextResponse } from "next/server"; // Importing types for request and response handling
import { getCodersBackendService } from "../services/coderBackendService"; // Importing the service function to fetch backend coders

// Asynchronous function to handle GET requests
export async function GET(_: NextRequest) {
    try {
        const data = await getCodersBackendService(); // Fetching backend coders data from the service
        return NextResponse.json({ data }, { status: 200 }); // Returning the fetched data with a 200 status code
    } catch (error) {
        // Handling any errors that occur during the fetching process
        return NextResponse.json({ message: "Error with GET CODERS BACKEND SERVICE" }, { status: 500 }); // Responding with a 500 status code on error
    }
}
