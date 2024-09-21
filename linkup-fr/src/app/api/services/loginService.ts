import { IUserLogin, IUserBack } from "../interfaces/IUserInterface";

export async function loginService(user: Partial<IUserLogin>):Promise<IUserBack | {message: string}>{
    try{
        const response = await fetch("https://linkupv1-production.up.railway.app/api/v1/Account/login", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        if(!response.ok)throw new Error("Error with the response");
        return await response.json();
    }catch(error){
        return ({message: "Errro with the login"});
    }
}