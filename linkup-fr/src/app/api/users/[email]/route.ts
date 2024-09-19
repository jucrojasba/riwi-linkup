import { NextRequest, NextResponse } from "next/server";
import { deleteUserBack, getUserServiceBack, patchUserBack } from "../../services/userService";

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


export async function PATCH(req: NextRequest, { params }: { params: { email: string } }) {
  const { email } = params;

  if (!email) {
    return NextResponse.json({ message: 'EMAIL is required' }, { status: 400 });
  }

  const body = await req.json();
  
  if (!body || (!body.email && !body.phoneNumber)) {
    return NextResponse.json({ message: 'At least one of EMAIL or PHONE NUMBER is required' }, { status: 400 });
  }

  const result = await patchUserBack(email, body);

  if ('message' in result) {
    return NextResponse.json({ message: 'Error updating user' }, { status: 500 });
  }

  return NextResponse.json({ message: 'User updated successfully' }, { status: 200 });
}


export async function DELETE(req: NextRequest, { params }: { params: { email: string } }) {
  const { email } = params;

  if (!email) {
    return NextResponse.json({ message: 'EMAIL is required' }, { status: 400 });
  }

  const deleteResponse = await deleteUserBack(email);

  if (deleteResponse.status !== 200) {
    return NextResponse.json({ message: 'Error deleting user' }, { status: 500 });
  }

  return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
}