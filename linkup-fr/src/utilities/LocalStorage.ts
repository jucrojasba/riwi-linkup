import { ICoder } from "@/UI/interfaces/ICoderInterface";

export function saveLocalStorage(name: string,data: string | ICoder, ):void{
    localStorage.setItem(`${name}`, JSON.stringify(data));
}
export function clearLocalStorage():void{
    localStorage.clear();
}