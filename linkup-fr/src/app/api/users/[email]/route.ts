import { NextRequest, NextResponse } from "next/server";
import { getUserServiceBack } from "../../services/userService";

export async function GET(req: NextRequest, { params }: { params: { email: string } }) {
  const { email } = params;

  if (!email) {
    return NextResponse.json({ message: 'EMAIL is required' }, { status: 400 });
  }

  const user = await getUserServiceBack(email);
  if (!user || 'message' in user) {
    return NextResponse.json({ message: 'Error with GET USER' }, { status: 500 });
  }

  return NextResponse.json({ user }, { status: 200 });
}
