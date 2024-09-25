import { NextRequest, NextResponse } from "next/server";
import { verifyData } from "../../utils/verifyData";
import { registerProvider } from "../../services/registerProviderService";
import { generateRandomPassword } from "../../utils/generatePasswordRandom";
import { IUserRegister } from "../../interfaces/IUserInterface";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const { name, email } = await req.json();
    const dataVerify = verifyData(name, email);
    
    if (!dataVerify) {
        return NextResponse.json({ message: "Is required all params. name, email the Provider" });
    }

    const passwordGenerate: string = "riwi123"; // Consider generating a random password

    // Logic for creating a new user
    const newUser: IUserRegister = {
        name,
        email,
        password: passwordGenerate,
        phone: "1234567890",
        sector: 1
    };

    const data = await registerProvider(newUser);
    console.log("data,cacc", data);

    const newData = {
        ...data,
        password: passwordGenerate // Exposing the password is a security concern
    };

    if ("message" in data) {
        return NextResponse.json(data.message, { status: 500 });
    }

    return NextResponse.json(newData, { status: 201 });
}
