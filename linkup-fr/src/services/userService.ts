import {
  IApiResponseUser, // Interface for the API response structure for a user
  IPatchUserRequest, // Interface for the patch request data structure for updating a user
} from "@/UI/interfaces/IUserInterface"; // Importing user-related interfaces
import fetchApi from "@/utilities/fetchApi"; // Importing the fetchApi utility for making API requests

// This function retrieves a user by their email address
export async function getUserServiceByEmail(
  email: string
): Promise<IApiResponseUser | { message: string }> {
  // Making a GET request to fetch the user based on the provided email
  const user = await fetchApi(`api/users/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Setting the content type to JSON
    },
  });
  return user; // Returning the user data or message
}

// This function updates user data based on the provided email
export async function patchUserService(
  email: string,
  data: IPatchUserRequest // Data structure for the update request
): Promise<{ status: number } | { message: string } | undefined> {
  try {
    // Making a PATCH request to update the user's information
    const response = await fetchApi(`api/users/${email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", // Setting the content type to JSON
      },
      body: JSON.stringify(data), // Converting the data to JSON format for the request body
    });

    // If the response contains a message, it indicates a successful update
    if (response && "message" in response) {
      return { status: 200 }; // Returning a success status
    }

    return; // Returning undefined if there was no response with a message
  } catch (error) {
    // Catching any errors that occur during the request
    return { message: "Error updating user" }; // Returning an error message
  }
}

// This function deletes a user by their email address
export async function deleteUserService(
  email: string
): Promise<{ message: string } | undefined> {
  try {
    // Making a DELETE request to remove the user based on the provided email
    const response = await fetchApi(`api/users/${email}`, { method: "DELETE" });

    // If the response contains a message, the deletion was successful
    if (response && "message" in response) {
      return; // Returning undefined if deletion is successful
    }

    return { message: "User deleted successfully" }; // Returning a success message
  } catch (error) {
    // Catching any errors that occur during the request
    return { message: "Error deleting user" }; // Returning an error message
  }
}

// This function resets a user's password
export async function patchResetPasswordUser(
  email: string,
  password: string,
  confirmPassword: string
): Promise<{ message: string }> {
  // Making a PATCH request to reset the user's password
  const data = await fetchApi(`/api/reset-password/${email}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json", // Setting the content type to JSON
    },
    body: JSON.stringify({ password, confirmPassword }), // Sending the new password and confirmation in the request body
  });
  return data; // Returning the response data
}
