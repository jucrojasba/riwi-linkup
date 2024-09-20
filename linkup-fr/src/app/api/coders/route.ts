import { NextRequest, NextResponse } from "next/server";
import { createCoder } from "../services/coderService";

export async function POST(req:NextRequest, res:NextResponse):Promise<NextResponse>{
    try{
        const {name,birthday, description, urlImage, genderId, clanId, softSkillIds, languages, technicalSkills} = await req.json();
        if(!name || !birthday || !description || !urlImage || !genderId || !clanId || !softSkillIds || !languages || !technicalSkills){
            return NextResponse.json({message: "Error, Is required all params for create coder"});
        }
        const data = await createCoder({name,birthday, description, urlImage, genderId, clanId, softSkillIds, languages, technicalSkills});
        return NextResponse.json({data}, {status: 200});
    }catch(error){
        return NextResponse.json({message: "Error with GET CODERS BACKEND SERVICE"}, {status:500})
    }
}