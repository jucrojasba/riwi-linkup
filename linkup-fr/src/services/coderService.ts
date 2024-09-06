import { ICoder } from "@/UI/interfaces/ICoderInterface";
import { IUser } from "@/UI/interfaces/IUserInterface";
import fetchApi from "@/utilities/fetchApi";

export async function getCodersService():Promise<ICoder[] | undefined>{
    
    const data = await fetchApi("http://localhost:5000/coders");
    if(!data)return;
    const filteredCoders = data.map((coder:Partial<ICoder>)=>({
        id: coder.id!,
        url_image: coder.url_image!,
        name: coder.name!,
        birthday: coder.birthday!
    }));
    return filteredCoders;
}

export async function deleteCoderService(coder_id:number):Promise<IUser[] | undefined>{
    const data = await fetchApi(`http://localhost:5000/coders/${coder_id}`, {
        method:"DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if(!data)return;
    return data;
}