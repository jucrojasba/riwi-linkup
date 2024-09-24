import { NextRequest, NextResponse } from "next/server";
import { deleteCoder, getCoderById, updateCoder } from "../../services/coderService";

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
export async function DELETE(req:NextRequest, {params}: {params: {id:string}}):Promise<NextResponse>{
    const {id} = params;
    if(!id){
        return NextResponse.json({message: "Is required id for deleteCoder"}, {status:400})
    }
    await deleteCoder(parseInt(id));
    return NextResponse.json({message: "User deleted correctly"}, {status:200});
}
export async function PUT(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  try {
    const { id } = params;
    const coderUpdate = await req.json();
    if (!id || !coderUpdate) {
      return NextResponse.json({ message: "All params are required" }, { status: 400 });
    }
    const data = await updateCoder(coderUpdate, parseInt(id));
    return NextResponse.json({message: "User updated correctly", data}, { status: 200 });
  } catch (error) {
    console.error("Error in PUT handler:", error); // Loguea el error para más información
    return NextResponse.json({ message: "Error with the update-coder" }, { status: 500 });
  }
}

