import { NextRequest, NextResponse } from "next/server";
import { sendEmailService } from "../services/emailService";

export async function POST(req:NextRequest):Promise<NextResponse>{
    const {email,emailLinkUp,subject,text} = await req.json();
    const data = await sendEmailService(email,emailLinkUp,subject,text);
    if(!data){
        return NextResponse.json({error:data}, {status:500});
    }
    return NextResponse.json({success:data}, {status:201})
}