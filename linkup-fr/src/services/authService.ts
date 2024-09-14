import { IUser } from "@/UI/interfaces/IUserInterface";
import fetchApi from "@/utilities/fetchApi";
import verifyData from "@/utilities/verifyData";

export async function authLoginService(user: Partial<IUser>): Promise<{name: string, email: string, token: string} | undefined>{
    const {email,password} = user;
    const dataVerify = verifyData(email,password);
    if(!dataVerify){
        console.log({message: "is necesary all params"});
        return;
    }
    const data = fetchApi("", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    return data;
}