import { NextRequest, NextResponse } from "next/server";
import { encryptEmail } from "../utils/encryptEmail";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const email = await req.json();
        console.log("email-back",email);

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        // Llama a la función de encriptación
        const { encryptedEmail, iv } = encryptEmail(email);
        console.log("dasdasdasd", encryptedEmail, "dadasdasdasdad",  iv);

        return NextResponse.json({ encryptedEmail, iv }, { status: 200 });
    } catch (error) {
        console.error("Error in POST /api/encryptEmail:", error);
        return NextResponse.json({ message: "Error processing request" }, { status: 500 });
    }
}

