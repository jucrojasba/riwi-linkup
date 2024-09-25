import { NextRequest, NextResponse } from "next/server"; // Importing Next.js objects for handling requests and responses
import { getTechSkillsService } from "../services/techSkillService"; // Importing the service to fetch technical skills data

export async function GET(_: NextRequest) {
    try {
        const data = await getTechSkillsService(); // Fetching the technical skills data using the service
        return NextResponse.json({ data }, { status: 200 }); // Returning the data in JSON format with a 200 status code (success)
    } catch (error) {
        return NextResponse.json({ message: "Error with GET TECHSKILLS" }, { status: 500 }); // If an error occurs, returning a JSON error message with a 500 status code (server error)
    }
}
