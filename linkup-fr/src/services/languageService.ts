import { ILanguage } from "@/UI/interfaces/languageInterface";
import fetchApi from "@/utilities/fetchApi";

export async function getLanguagesService():Promise<ILanguage[] | null>{
    const languages = await fetchApi("api/languages");
    if(!languages){
        console.log({message: "Error to get languages"})
        return null;
    }
    const filteredLanguage = languages.data.map((language: Partial<ILanguage>) => ({
        id: language.id,
        name: language.name,
        label: language.name,
        checked: false
    }))
    return filteredLanguage;
}