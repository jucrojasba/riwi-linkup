import { NextRequest, NextResponse } from "next/server";
import { getSectorsService } from "../services/sectorService";

export async function GET(_:NextRequest){
    try{
        const data = await getSectorsService();
        return NextResponse.json({data}, {status: 200});
    }catch(error){
        return NextResponse.json({message: "Error with GET SECTORS"}, {status:500})
    }
}