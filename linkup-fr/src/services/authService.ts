import { IUserProdiverRegister, IUserProviderLogin } from "@/app/api/interfaces/IUserProvider";
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
    const data = await fetchApi("https://linkupv1-production.up.railway.app/api/v1/Account/login", {
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
        console.log("ver",name,email,password, phone,sector)
        console.log({message: "is necesary all params"});
        return;
    }

    const data = await fetchApi("https://linkupv1-production.up.railway.app/api/v1/Account/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            
        })
    });
    return data;
}

export async function registerProviderService(user: {name:string, email:string, image:string}):Promise<IUserProdiverRegister | {message: string} >{
    const data = await fetchApi("api/auth/registerProvider", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    });
    if(!data)return (data);
    const {userProvider} = data;
    return userProvider;
};

export async function loginProviderService(user: {name:string,email:string, image:string}):Promise< IUserProviderLogin |{message:string}>{
    const data = await fetchApi("api/auth/loginProvider", {
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify(user)
    });
    if(!data)return(data);
    const {userProvider} = data;
    return userProvider;
}