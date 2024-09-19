import { IApiResponseUser, IPatchUserRequest } from "@/UI/interfaces/IUserInterface";
import fetchApi from "@/utilities/fetchApi";


export async function getUserService(email:string):Promise<IApiResponseUser | {message:string} | undefined>{
    try {
        const user = await fetchApi(`api/users/${email}`);
        if(user && 'message' in user) {
            return
        }
        return user;
    } catch (error) {
        return ({message: "Error fetching user"});
    }
}

export async function patchUserService(email: string, data: IPatchUserRequest): Promise<{status: number} | {message: string} | undefined> {
    try {
        const response = await fetchApi(`api/users/${email}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response && 'message' in response) {
            return { status: 200 };
        }

        return;
    } catch (error) {
        return { message: "Error updating user" };
    }
}

export async function deleteUserService(email: string): Promise<{ message: string } | undefined> {
    try {
        const response = await fetchApi(`api/users/${email}`, { method: 'DELETE' });

        if (response && 'message' in response) {
            return; 
        }

        return { message: 'User deleted successfully' }; 
    } catch (error) {
        return { message: 'Error deleting user' }; 
    }
}
