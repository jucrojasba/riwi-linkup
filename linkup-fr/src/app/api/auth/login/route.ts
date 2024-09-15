import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest, res: NextResponse):Promise<NextResponse>{
    try{
        const token = "TOKEN";
        const name = "JOSE";
        const {email,password} = await req.json();
        return NextResponse.json({name,email,token});

    }catch(error){
        return NextResponse.json({message: "Error to login"}, {status: 500})
    }
}