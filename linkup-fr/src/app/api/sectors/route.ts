import { NextRequest, NextResponse } from "next/server"; // Importing the necessary objects to handle requests and responses in Next.js
import { getSectorsService } from "../services/sectorService"; // Importing the service that retrieves sector data

export async function GET(_: NextRequest) {
    try {
        const data = await getSectorsService(); // Fetching sector data using the service
        return NextResponse.json({ data }, { status: 200 }); // Returning the data in JSON format with a status code of 200 (OK)
    } catch (error) {
        return NextResponse.json({ message: "Error with GET SECTORS" }, { status: 500 }); // If an error occurs, return an error message and status 500 (Internal Server Error)
    }
}
