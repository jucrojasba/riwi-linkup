import { NextRequest, NextResponse } from "next/server"; // Importing Next.js request and response handling utilities
import { getLanguagesService } from "../services/languageService"; // Importing the service to fetch languages data

// GET request handler for fetching languages
export async function GET(_: NextRequest) {
    try {
        const data = await getLanguagesService(); // Fetching the list of languages from the service
        return NextResponse.json({ data }, { status: 200 }); // Returning the data as a JSON response with a 200 status code (success)
    } catch (error) {
        return NextResponse.json({ message: "Error with GET LANGUAGES" }, { status: 500 }); // If an error occurs, return a JSON error message with a 500 status code (server error)
    }
}
