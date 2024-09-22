import { NextRequest, NextResponse } from "next/server";
import { verifyData } from "../utils/verifyData";

export async function POST(req:NextRequest): Promise<NextResponse>{
    try{
        const { name, email, sectorId, roleId, phoneNumber} = await req.json();
        const firstLettersName:string = name.substring(0,3);
        const firstLetterEmail:string = email.substring(0,5);
        const firstPhoneNumber:string = phoneNumber.substring(1,4);
        const numberRandom: number = Math.floor(Math.random() * 10);
        const key:string = `${firstLettersName}${sectorId}${firstLetterEmail}${roleId}${firstPhoneNumber}${numberRandom}`;

        const dataVerify = verifyData(name, email, sectorId, roleId);
        if(!dataVerify){
            return NextResponse.json({message: "Is required all params"}, {status: 400});
        }
        return NextResponse.json({key}, {status: 201});

    }catch(error){
        return NextResponse.json({message: "Error to generate key"}, {status:500})
    }
}