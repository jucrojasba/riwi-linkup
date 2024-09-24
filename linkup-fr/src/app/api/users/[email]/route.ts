import { NextRequest, NextResponse } from "next/server"; // Importing Next.js objects for request and response handling
import {
  deleteUserBack,
  getUserServiceBack,
  patchUserBack,
} from "../../services/userService"; // Importing user-related services: get, patch, and delete

// Handling GET request to fetch a user by email
export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const { email } = params; // Extracting email from the URL parameters

  if (!email) {
    // If email is not provided, return a 400 error
    return NextResponse.json({ message: "EMAIL is required" }, { status: 400 });
  }

  const user = await getUserServiceBack(email); // Fetching user details using the service

  if (user && "message" in user) {
    // If user not found, return a 404 error
    return NextResponse.json({ user }, { status: 404 });
  }

  // Return the user data with a 200 status code
  return NextResponse.json({ user }, { status: 200 });
}

// Handling PATCH request to update a user's details
export async function PATCH(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const { email } = params; // Extracting email from the URL parameters

  if (!email) {
    // If email is not provided, return a 400 error
    return NextResponse.json({ message: "EMAIL is required" }, { status: 400 });
  }

  const body = await req.json(); // Parsing request body to get updated user data

  if (!body || (!body.email && !body.phoneNumber)) {
    // If neither email nor phone number is provided in the request, return a 400 error
    return NextResponse.json(
      { message: "At least one of EMAIL or PHONE NUMBER is required" },
      { status: 400 }
    );
  }

  const result = await patchUserBack(email, body); // Attempting to update user details with the provided data

  if ("message" in result) {
    // If an error occurs during the update, return a 500 error
    return NextResponse.json({ message: "Error updating user" }, { status: 500 });
  }

  // If successful, return a 200 status code with a success message
  return NextResponse.json(
    { message: "User updated successfully" },
    { status: 200 }
  );
}

// Handling DELETE request to remove a user by email
export async function DELETE(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const { email } = params; // Extracting email from the URL parameters

  if (!email) {
    // If email is not provided, return a 400 error
    return NextResponse.json({ message: "EMAIL is required" }, { status: 400 });
  }

  const deleteResponse = await deleteUserBack(email); // Attempting to delete the user

  if (deleteResponse.status !== 200) {
    // If an error occurs during deletion, return a 500 error
    return NextResponse.json({ message: "Error deleting user" }, { status: 500 });
  }

  // If successful, return a 200 status code with a success message
  return NextResponse.json(
    { message: "User deleted successfully" },
    { status: 200 }
  );
}
