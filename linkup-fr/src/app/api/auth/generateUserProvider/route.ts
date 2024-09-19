import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


export async function POST(req:NextRequest):Promise<NextResponse>{
    try{
        const {user} = await req.json();
        if(!user)return NextResponse.json({message: "Error. User is necesary"});
        const tokenGenerate = generateToken(user);
        const newUser = {
            ...user,
            token: tokenGenerate,
            role:2
        }
        return NextResponse.json({userProvider: newUser}, {status:200})
    }catch(error){
        return NextResponse.json({message: "Errro generateToken Providers"});
    }
}

function generateToken(user:{name:string, email:string, image:string}){
    return jwt.sign(user, "SECRET", {expiresIn: "1h"});
}