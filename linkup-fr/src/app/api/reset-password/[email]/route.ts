import { NextRequest, NextResponse } from "next/server";
import { PatchResetPasswordUser } from "../../services/userService";

export async function PATCH(req: NextRequest, {params}: {params: {email:string}}): Promise<NextResponse>{
    try{
        const {email} = params;
        if(!email){
            return NextResponse.json({message: "Is required all params"}, {status: 400})
        };
        const {password,confirmPassword} = await req.json();
        if(!password || !confirmPassword) {
            return NextResponse.json({message: "Is required all params"}, {status: 400})
        }
        const userUpdate = await PatchResetPasswordUser(email,password,confirmPassword);
        return NextResponse.json(userUpdate, {status:200});
    }catch(error){
        return NextResponse.json({message: "Error with the reset-password"}, {status: 500});
    }
}