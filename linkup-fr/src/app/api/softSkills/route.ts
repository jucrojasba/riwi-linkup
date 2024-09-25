import { NextRequest, NextResponse } from "next/server"; // Importing NextRequest and NextResponse for handling incoming requests and sending responses
import { getSoftSkillsService } from "../services/softSkillService"; // Importing the service that retrieves soft skills data

export async function GET(_: NextRequest) {
    try {
        const data = await getSoftSkillsService(); // Fetching soft skills data using the service
        return NextResponse.json({ data }, { status: 200 }); // Returning the data as a JSON response with a status code of 200 (success)
    } catch (error) {
        return NextResponse.json({ message: "Error with GET SOFTSKILLS" }, { status: 500 }); // If there's an error, returning a JSON error message with a 500 status code (server error)
    }
}
