import { IClan, IClans } from "@/UI/interfaces/clanInterface";
import fetchApi from "@/utilities/fetchApi";

export async function getClansService():Promise<IClans | null>{
    const data = await fetchApi("https://linkupv1-production.up.railway.app/api/v1/Coders/Clans");
    if(!data){
        console.log({message: "Error to get Clans"})
        return null;
    }
    const filteredClan = data.map((clan: IClan)=>({
        id: clan.id,
        name: clan.name,
        label: clan.name,
        checked: false

    }));
    return filteredClan;
}