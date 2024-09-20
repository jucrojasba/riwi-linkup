import { NextRequest, NextResponse } from "next/server";
import { getGendersService } from "../services/genderService";

export async function GET(_:NextRequest){
    try{
        const data = await getGendersService();
        return NextResponse.json({data}, {status: 200});
    }catch(error){
        return NextResponse.json({message: "Error with GET GENDERS"}, {status:500})
    }
}