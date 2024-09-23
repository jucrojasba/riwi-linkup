import { NextRequest, NextResponse } from "next/server";
import { filterCoders } from "../../services/coderService";

export async function POST(req:NextRequest):Promise<NextResponse>{
    try{
        const {queryFilterComplete} = await req.json();
        if(!queryFilterComplete){
            return NextResponse.json({message: "Is required params"});
        }
        const serviceFilterCoders = await filterCoders(queryFilterComplete);
        return NextResponse.json(serviceFilterCoders, {status: 200});

    }catch(error){
        return NextResponse.json({message: "Errror"}, {status: 500})
    }
}