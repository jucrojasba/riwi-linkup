import { NextRequest, NextResponse } from "next/server"; // Importing types for request and response
import { getCoderTrainingService } from "../services/coderTrainingService"; // Importing the service to fetch coder training data

// Asynchronous function to handle GET requests
export async function GET(_: NextRequest) {
    try {
        const data = await getCoderTrainingService(); // Fetching coder training data from the service
        return NextResponse.json({ data }, { status: 200 }); // Responding with the fetched data and a 200 status code
    } catch (error) {
        // Handling errors that may occur during the fetching process
        return NextResponse.json({ message: "Error with GET CODER TRAINING" }, { status: 500 }); // Responding with a 500 status code on error
    }
}
