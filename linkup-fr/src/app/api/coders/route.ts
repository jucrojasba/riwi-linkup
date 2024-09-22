import { NextRequest, NextResponse } from "next/server";
import { createCoder, getCoders } from "../services/coderService";

export async function POST(req:NextRequest, res:NextResponse):Promise<NextResponse>{
    try{
        const {name,birthday, description, urlImage, genderId, clanId, softSkillIds, languages, technicalSkills} = await req.json();
        if(!name || !birthday || !description || !urlImage || !genderId || !clanId || !softSkillIds || !languages || !technicalSkills){
            return NextResponse.json({message: "Error, Is required all params for create coder"});
        }
        const data = await createCoder({name,birthday, description, urlImage, genderId, clanId, softSkillIds, languages, technicalSkills});
        return NextResponse.json({data}, {status: 200});
    }catch(error){
        return NextResponse.json({message: "Error with POST CODERS BACKEND"}, {status:500})
    }
};

export async function GET(req: NextRequest, res: NextResponse): Promise<NextResponse>{
    try{
        const coders = await getCoders();
        if(coders && "message" in coders){
            return NextResponse.json(coders, {status: 500});
        }
        return NextResponse.json(coders, {status:200})

    }catch(error){
        return NextResponse.json({message: "Error with the GET CODERS BACKEND "}, {status: 500})
    }
}