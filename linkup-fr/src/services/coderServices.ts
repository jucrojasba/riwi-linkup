import { ICoder } from "@/UI/interfaces/ICoderInterface";
import fetchApi from "@/utilities/fetchApi";

export async function getCodersService():Promise<ICoder[] | undefined>{
    const data = await fetchApi("http://localhost:5000/coders");
    if(!data)return;
    const filteredCoders = data.map((coder:Partial<ICoder>)=>({
        url_image: coder.url_image!,
        name: coder.name!,
        birthday: coder.birthday!
    }));
    return filteredCoders;
}