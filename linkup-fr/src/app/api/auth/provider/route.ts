import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// export async function POST(req:NextRequest, res: NextResponse):Promise<NextResponse>{
//     try{
//         const tken = "TOKEN";
//         const name = "JOSE";
//         const {email,password} = await req.json();
//         // return NextResponse.json({name,email,token});

//     }catch(error){
//         return NextResponse.json({message: "Error to login"}, {status: 500})
//     }
// }
