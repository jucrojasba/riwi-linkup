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
    const data = fetchApi("http://localhost:3000/api/auth/login", {
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

export async function authRegisterService(user:Partial<IUser>):Promise<{name:string,email:string,token:string} | undefined>{
    const {name,email,password, phone,sector} = user;
    const dataVerify = verifyData(name,email,password,phone,sector);
    if(!dataVerify){
        console.log({message: "is necesary all params"});
        return;
    }
    const data = fetchApi("https://linkupv1-production.up.railway.app/api/v1/Account/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            
        })
    });
    return data;
}