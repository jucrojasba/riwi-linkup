import { NextRequest, NextResponse } from "next/server";
import { getCoderById } from "../../services/coderService";

export async function GET(req:NextRequest, {params}: {params: {id:string}}):Promise<NextResponse>{
    const {id} = params;
    if(!id){
        return NextResponse.json({message: "Is required id for getCoder"}, {status:400})
    }
    const data = await getCoderById(parseInt(id));
    if(data && "message" in data)return NextResponse.json({error: data});
    const {idCoder,name, birthday,description, urlImage,clanId,genderName, softSkills,languageLevels,technicalSkillLevels} = data;
    return NextResponse.json({success: "get coder correctly", data:{idCoder,name, birthday,description, urlImage,clanId,genderName,softSkills,languageLevels,technicalSkillLevels}});
}