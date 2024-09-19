import { NextRequest, NextResponse } from "next/server";
import { loginProvider } from "../../services/loginProviderService";
import { verifyData } from "../../utils/verifyData";
import { generateRandomPassword } from "../../utils/generatePasswordRandom";

export async function POST(req:NextRequest):Promise<NextResponse>{
    const {name,email} = await req.json();
    const dataVerify = verifyData(name,email);
    if(!dataVerify){
        return NextResponse.json({message: "Is required all params. name, email the Provider"})
    }
    const passwordGenerate:string = generateRandomPassword(12);
    const newUser = {
        email,
        password: passwordGenerate
    }
    const data = await loginProvider(newUser);
    const newData = {
        ...data,
        password: passwordGenerate,
        name,
    }
    if(!data){
        return NextResponse.json({data}, {status: 500});
    }
    return NextResponse.json({userProvider: newData}, {status:201});
}