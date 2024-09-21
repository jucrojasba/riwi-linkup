import { IUserRegister, IUserBack } from "../interfaces/IUserInterface";

export async function registerProvider(user: Partial<IUserRegister>):Promise<IUserBack | {message: string}>{
    const {name,email, password,phone,sector} = user;
    try{
        console.log(name,email, password,phone,sector)
        const response = await fetch("https://linkupv1-production.up.railway.app/api/v1/Account/register", {
            method:"POST",
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
        console.log(response, "response")
        if(!response.ok)throw new Error("Error with the response");
        return await response.json();
    }catch(error){
        return ({message: "Errro with the registerProvider"});
    }
}