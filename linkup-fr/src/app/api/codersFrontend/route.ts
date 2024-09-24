import { NextRequest, NextResponse } from "next/server"; // Importing types for request and response handling
import { getCodersFrontendService } from "../services/coderFrontendService"; // Importing the service function to fetch frontend coders

// Asynchronous function to handle GET requests
export async function GET(_: NextRequest) {
    try {
        const data = await getCodersFrontendService(); // Fetching frontend coders data from the service
        return NextResponse.json({ data }, { status: 200 }); // Returning the fetched data with a 200 status code
    } catch (error) {
        // Handling any errors that occur during the fetching process
        return NextResponse.json({ message: "Error with GET CODERS FRONTEND SERVICE" }, { status: 500 }); // Responding with a 500 status code on error
    }
}
