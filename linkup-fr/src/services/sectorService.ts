import { ISector, ISectors } from "@/UI/interfaces/SectorInterface";
import fetchApi from "@/utilities/fetchApi";

export default async function getSectorsService():Promise<ISectors>{
    const sectors = await fetchApi("api/sectors");
    return sectors;
}