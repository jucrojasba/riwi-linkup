import { NextRequest, NextResponse } from "next/server"; // Import necessary types
import { filterCoders } from "../../services/coderService"; // Import the filter service function

// Async function to handle POST requests for filtering coders
export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        // Extract the query filter from the request body
        const { queryFilterComplete } = await req.json();
        
        // Check if the required parameter is provided
        if (!queryFilterComplete) {
            return NextResponse.json({ message: "Query filter is required" }, { status: 400 });
        }
        
        // Call the filtering service function
        const serviceFilterCoders = await filterCoders(queryFilterComplete);
        
        // Return the filtered coders with a 200 status code
        return NextResponse.json(serviceFilterCoders, { status: 200 });

    } catch (error) {
        console.error("Error in POST /api/coders/filter:", error);
        return NextResponse.json({ message: "Error processing request" }, { status: 500 });
    }
}
