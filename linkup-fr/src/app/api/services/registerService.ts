import { IUserRegister, IUserBack } from "../interfaces/IUserInterface";

export async function registerService(user: Partial<IUserRegister>):Promise< IUserBack | {message:string}>{
    const {name,email,password, phone, sector } = user;
    try{
        const response = await fetch("https://linkupv1-production.up.railway.app/api/v1/Account/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
                phoneNumber: phone,
                sectorId:sector
            })
        });
        if(!response.ok)throw new Error("Error with the response");
        return await response.json();
    }catch(error){
        return ({message: "Error to register"})
    }
}