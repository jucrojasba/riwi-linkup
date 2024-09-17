import { NextRequest, NextResponse } from "next/server";
import { getCodersFrontendService } from "../services/coderFrontendService";

export async function GET(_:NextRequest){
    try{
        const data = await getCodersFrontendService();
        return NextResponse.json({data}, {status: 200});
    }catch(error){
        return NextResponse.json({message: "Error with GET CODERS FRONTEND SERVICE"}, {status:500})
    }
}