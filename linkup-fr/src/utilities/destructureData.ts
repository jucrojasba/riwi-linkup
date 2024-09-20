import { IClanShort } from "@/UI/interfaces/clanInterface";

export function destructureData(data:any){
    return data.map((value: IClanShort)=>({
        id: value.id,
        name:value.id
    }))
}