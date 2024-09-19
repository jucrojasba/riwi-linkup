import { IGender } from "@/UI/interfaces/GenderInterface";
import fetchApi from "@/utilities/fetchApi";

export async function getGendersService():Promise<IGender[] | null>{
    const genders = await fetchApi("api/genders");
    if(!genders){
        console.log({message: "Error to get genders"})
        return null;
    }
    const filteredGender = genders.data.map((gender: Partial<IGender>) => ({
        id: gender.id,
        name: gender.name,
    }))
    return filteredGender;
}