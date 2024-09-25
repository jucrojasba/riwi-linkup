import { NextRequest, NextResponse } from "next/server"; // Importing necessary modules for handling requests and responses
import { getGendersService } from "../services/genderService"; // Importing the service to fetch gender data

// Asynchronous function to handle GET requests
export async function GET(_: NextRequest) {
    try {
        const data = await getGendersService(); // Fetching gender data from the service
        return NextResponse.json({ data }, { status: 200 }); // Returning the data with a 200 status
    } catch (error) {
        return NextResponse.json({ message: "Error with GET GENDERS" }, { status: 500 }); // Handling errors and returning a 500 status
    }
}
