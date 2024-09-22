import { IGenerateKey } from "@/UI/interfaces/IGenerateKeyInterface";
import fetchApi from "@/utilities/fetchApi";

export async function generateKeyService(data:IGenerateKey):Promise<{key: string}>{
    const apiFetch = fetchApi("api/generateKeys",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    if(apiFetch && "message" in apiFetch){
        return apiFetch;
    }
    return apiFetch;
}