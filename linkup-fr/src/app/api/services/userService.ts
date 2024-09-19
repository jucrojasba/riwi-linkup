import { IUser } from "../interfaces/IUserInterface";

export async function getUserServiceBack(email:string):Promise<IUser | {message:string}>{
    try {
        const response = await fetch(`https://linkupv1-production.up.railway.app/api/v1/User/email/${email}`);
        if(!response.ok) throw new Error('Error with the response');
        return await response.json();
    } catch (error) {
        return ({message:'Error fetching user'});
    }
}