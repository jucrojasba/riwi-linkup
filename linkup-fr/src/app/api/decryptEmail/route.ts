import { NextRequest, NextResponse } from "next/server";
import { decryptEmail } from "../utils/encryptEmail";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { email, iv } = await req.json();

    const decodedEmail = decodeURIComponent(email);
    const decodedIv = decodeURIComponent(iv);

    if (!decodedEmail || !decodedIv) {
        return NextResponse.json({ message: "Email and IV are required" }, { status: 400 });
    }

    const emailDecrypted = decryptEmail(decodedEmail, decodedIv);
    
    if (!emailDecrypted) {
      return NextResponse.json({ message: "Error decrypting email" }, { status: 500 });
    }

    return NextResponse.json({ email: emailDecrypted }, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/decrypt-email:", error);
    return NextResponse.json({ message: "Error processing request" }, { status: 500 });
  }
}
