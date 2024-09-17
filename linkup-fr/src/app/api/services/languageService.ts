import { ILanguage } from "../interfaces/ILanguageInterface";
export async function getLanguagesService():Promise<ILanguage[] | null | undefined | {message: string}>{
    try{
        const response = await fetch("https://linkupv1-production.up.railway.app/api/v1/Coders/Languages");
        if(!response.ok) throw new Error("Error with the response");
        const data = await response.json();
        return data;
    }catch(error){
        return ({message: "Error with the getLanguagesService"})
    }
}