import { NextRequest, NextResponse } from "next/server";
import { getSoftSkillsService } from "../services/softSkillService";

export async function GET(_:NextRequest){
    try{
        const data = await getSoftSkillsService();
        return NextResponse.json({data}, {status: 200});
    }catch(error){
        return NextResponse.json({message: "Error with GET SOFTSKILLS"}, {status:500})
    }
}