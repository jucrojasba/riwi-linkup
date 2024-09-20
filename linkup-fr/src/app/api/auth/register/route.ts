import { NextRequest, NextResponse } from "next/server";
import { registerService } from "../../services/registerService";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { name, email, password, phone, sector } = await req.json();
  const data = await registerService({
    name,
    email,
    password,
    phoneNumber: phone,
    sectorId: sector,
  });
  if (!data) {
    return NextResponse.json({ data }, { status: 500 });
  }
  return NextResponse.json({ user: data }, { status: 201 });
}
