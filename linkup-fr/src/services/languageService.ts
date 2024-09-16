import { ILanguages, ILanguage } from "@/UI/interfaces/languageInterface";
import fetchApi from "@/utilities/fetchApi";

export async function getLanguagesService():Promise<ILanguage[] | null>{
    const data = await fetchApi("https://linkupv1-production.up.railway.app/api/v1/Coders/Languages");
    if(!data){
        console.log({message: "Error to get languages"})
        return null;
    }
    const filteredLanguage = data.map((language: ILanguage) => ({
        id: language.id,
        name: language.name,
        label: language.name,
        checked: false
    }))
    return filteredLanguage;
}