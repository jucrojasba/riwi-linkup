import { IEmail } from "@/UI/interfaces/emailInterface";
import fetchApi from "@/utilities/fetchApi";

export async function emailService(email:Partial<IEmail>):Promise<{success:{message:string}, status:number} | {error:{message:string}, status:number}>{
    const data = await fetchApi("api/emails", {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(email)
    });
    return data;
}