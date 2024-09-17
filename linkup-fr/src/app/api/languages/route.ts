import { NextRequest, NextResponse } from "next/server";
import { getLanguagesService } from "../services/languageService";

export async function GET(_:NextRequest){
    try{
        const data = await getLanguagesService();
        return NextResponse.json({data}, {status: 200});
    }catch(error){
        return NextResponse.json({message: "Error with GET LANGUAGES"}, {status:500})
    }
}