import { NextRequest, NextResponse } from "next/server"; // Importing Next.js request and response types
import { getCompaniesByMonth } from "../services/companyService"; // Importing the service function to fetch companies

// Asynchronous function to handle GET requests
export async function GET(_: NextRequest) {
    try {
        const data = await getCompaniesByMonth(); // Fetching companies by month from the service
        return NextResponse.json({ data }, { status: 200 }); // Responding with the data and a 200 status
    } catch (error) {
        // Handling errors that occur during data fetching
        return NextResponse.json({ message: "Error with GET COMPANIES BY MONTH" }, { status: 500 }); // Responding with a 500 status on error
    }
}
