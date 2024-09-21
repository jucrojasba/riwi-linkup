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
    const passwordGenerate:string = "riwi123"
    const newUser = {
        email,
        password: passwordGenerate
    }
    const data = await loginProvider(newUser);
    console.log("eq---",data)
    if(data && "message" in data){
        return NextResponse.json(data.message, {status: 500});
    }
    const newData = {
        ...data,
        password: passwordGenerate,
        name,
    }
    return NextResponse.json(newData, {status:201});
}