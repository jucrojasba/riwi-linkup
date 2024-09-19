import { IApiResponseUser } from "@/UI/interfaces/IUserInterface";
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