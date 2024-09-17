import { NextRequest, NextResponse } from "next/server";
import { verifyData } from "../../utils/verifyData";
import { registerProvider } from "../../services/registerProviderService";

export async function POST(req:NextRequest):Promise<NextResponse>{
    const {name,email} = await req.json();
    const dataVerify = verifyData(name,email);
    if(!dataVerify){
        return NextResponse.json({message: "Is required all params. name, email the Provider"})
    }
    //Logic for get user by email
    const newUser = {
        name,
        email,
        password: "riwi123",
        phoneNumber: "1234567890",
        sectorId: 1
    }
    const data = await registerProvider(newUser);
    if(!data){
        return NextResponse.json({data}, {status: 500});
    }
    return NextResponse.json({userProvider:data}, {status:201});
}