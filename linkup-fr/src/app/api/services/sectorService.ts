import { ISector } from "../interfaces/ISectorInterface";

export async function getSectorsService():Promise<ISector[] | null | undefined | {message: string}>{
    try{
        const response = await fetch("https://linkupv1-production.up.railway.app/api/v1/Sector");
        if(!response.ok) throw new Error("Error with the response");
        const data = await response.json();
        return data;
    }catch(error){
        return ({message: "Error with the getSectorsService"})
    }
}