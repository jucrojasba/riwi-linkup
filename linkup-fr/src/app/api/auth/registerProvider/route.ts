import { NextRequest, NextResponse } from "next/server";
import { verifyData } from "../../utils/verifyData";
import { registerProvider } from "../../services/registerProviderService";
import { generateRandomPassword } from "../../utils/generatePasswordRandom";

export async function POST(req:NextRequest):Promise<NextResponse>{
    const {name,email} = await req.json();
    const dataVerify = verifyData(name,email);
    if(!dataVerify){
        return NextResponse.json({message: "Is required all params. name, email the Provider"})
    }
    const passwordGenerate:string = generateRandomPassword(12);
    //Logic for get user by email
    const newUser = {
        name,
        email,
        password: passwordGenerate,
        phoneNumber: "1234567890",
        sectorId: 1
    }
    const data = await registerProvider(newUser);
    const newData = {
        ...data,
        password: passwordGenerate
    }
    if(!data){
        return NextResponse.json({data}, {status: 500});
    }
    return NextResponse.json({userProvider: newData}, {status:201});
}