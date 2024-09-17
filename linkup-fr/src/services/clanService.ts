import { IClan, IClans } from "@/UI/interfaces/clanInterface";
import fetchApi from "@/utilities/fetchApi";

export async function getClansService():Promise<null | IClan[] | undefined>{
    const clans = await fetchApi("/api/clans");
    if(!clans){
        console.log({message: "Error to get Clans"})
        return null;
    }
    const filteredClan = clans.data.map((clan: Partial<IClan>)=>({
        id: clan.id,
        name: clan.name,
        label: clan.name,
        checked: false
    }));
    return filteredClan;
}