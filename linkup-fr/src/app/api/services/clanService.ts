import { IClan } from "../interfaces/IClanInterface";

export async function getClansService():Promise<IClan[] | null | undefined | {message: string}>{
    try{
        const response = await fetch("https://linkupv1-production.up.railway.app/api/v1/Coders/Clans");
        if(!response.ok) throw new Error("Error with the response");
        const data = await response.json();
        return data;
    }catch(error){
        return ({message: "Error with the getClansService"})
    }
}