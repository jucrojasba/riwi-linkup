import { NextRequest, NextResponse } from "next/server";
import { getCodersBackendService } from "../services/coderBackendService";

export async function GET(_:NextRequest){
    try{
        const data = await getCodersBackendService();
        return NextResponse.json({data}, {status: 200});
    }catch(error){
        return NextResponse.json({message: "Error with GET CODERS BACKEND SERVICE"}, {status:500})
    }
}