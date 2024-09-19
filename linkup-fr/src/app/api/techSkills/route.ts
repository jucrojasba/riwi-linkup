import { NextRequest, NextResponse } from "next/server";
import { getTechSkillsService } from "../services/techSkillService";

export async function GET(_:NextRequest){
    try{
        const data = await getTechSkillsService();
        return NextResponse.json({data}, {status: 200});
    }catch(error){
        return NextResponse.json({message: "Error with GET TECHSKILLS"}, {status:500})
    }
}