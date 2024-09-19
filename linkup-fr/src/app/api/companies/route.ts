import { NextRequest, NextResponse } from "next/server";
import { getCompaniesByMonth } from "../services/companyService";

export async function GET(_:NextRequest){
    try{
        const data = await getCompaniesByMonth();
        return NextResponse.json({data}, {status: 200});
    }catch(error){
        return NextResponse.json({message: "Error with GET COMPANIES BY MONTH"}, {status:500})
    }
}