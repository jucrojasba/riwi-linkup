import { NextRequest, NextResponse } from "next/server";
import { getCoderTrainingService } from "../services/coderTrainingService";

export async function GET(_:NextRequest){
    try{
        const data = await getCoderTrainingService();
        return NextResponse.json({data}, {status: 200});
    }catch(error){
        return NextResponse.json({message: "Error with GET CODER TRAINING"}, {status:500})
    }
}