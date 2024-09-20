import { IPatchUserBack, IUser } from "../interfaces/IUserInterface";

export async function getUserServiceBack(email:string):Promise<IUser | {message:string}>{
    try {
        const response = await fetch(`https://linkupv1-production.up.railway.app/api/v1/User/email/${email}`);
        if(!response.ok) throw new Error('Error with the response');
        return await response.json();
    } catch (error) {
        return ({message:'Error fetching user'});
    }
}

export async function patchUserBack(email: string, data: IPatchUserBack): Promise<{status: number} | {message: string}> {
    try {
        const response = await fetch(`https://linkupv1-production.up.railway.app/api/v1/User/${email}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        if (!response.ok) throw new Error('Error with the response');
        
        // Solo necesitamos retornar el status 200
        return { status: 200 };
    } catch (error) {
        return { message: 'Error updating user' };
    }
}

export async function deleteUserBack(email: string): Promise<{ status: number }> {
    try {
        const response = await fetch(`https://linkupv1-production.up.railway.app/api/v1/User/${email}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Error with the response');

        return { status: response.status };
    } catch (error) {
        return { status: 500 }; 
    }
}
