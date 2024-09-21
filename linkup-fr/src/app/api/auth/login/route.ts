import { NextRequest, NextResponse } from "next/server";
import { loginService } from "../../services/loginService";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const {email,password } = await req.json();
  const data = await loginService({
    email,
    password,
  });
  if (data && "message" in data) {
    return NextResponse.json( data , { status: 400 });
  }
  return NextResponse.json({ user: data }, { status: 201 });
}
