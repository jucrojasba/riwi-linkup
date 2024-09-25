import { NextRequest, NextResponse } from "next/server"; // Importing types for handling requests and responses
import { createCoder, getCoders } from "../services/coderService"; // Importing the service functions for creating and getting coders

// Asynchronous function to handle POST requests for creating a coder
export async function POST(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    try {
        // Destructuring the coder details from the incoming request body
        const { name, birthday, description, urlImage, genderId, clanId, softSkillIds, languages, technicalSkills } = await req.json();
        
        // Validating required parameters
        if (!name || !birthday || !description || !urlImage || !genderId || !clanId || !softSkillIds || !languages || !technicalSkills) {
            return NextResponse.json({ message: "Error, all parameters are required to create a coder" }, { status: 400 });
        }
        
        // Creating a new coder
        const data = await createCoder({ name, birthday, description, urlImage, genderId, clanId, softSkillIds, languages, technicalSkills });
        
        // Returning the created coder data with a 201 status code
        return NextResponse.json({ data }, { status: 201 });
    } catch (error) {
        console.error("Error in POST /api/coders:", error);
        return NextResponse.json({ message: "Error with POST CODERS BACKEND" }, { status: 500 });
    }
}

// Asynchronous function to handle GET requests for retrieving coders
export async function GET(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    try {
        // Fetching the list of coders
        const coders = await getCoders();
        
        // Handling the case where the service returns an error message
        if (coders && "message" in coders) {
            return NextResponse.json(coders, { status: 500 });
        }
        
        // Returning the list of coders with a 200 status code
        return NextResponse.json(coders, { status: 200 });
    } catch (error) {
        console.error("Error in GET /api/coders:", error);
        return NextResponse.json({ message: "Error with GET CODERS BACKEND" }, { status: 500 });
    }
}
