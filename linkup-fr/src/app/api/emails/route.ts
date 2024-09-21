import { NextRequest, NextResponse } from "next/server";
import { sendEmailService } from "../services/emailService";

export async function POST(req:NextRequest):Promise<NextResponse>{
    const {email,emailLinkUp,subject,text,html} = await req.json();
    const data = await sendEmailService(email,emailLinkUp,subject,text);
    if(!data || data.message === "Error to send message email"){
        return NextResponse.json({data}, {status:500});
    }
    return NextResponse.json({data}, {status:201})
}