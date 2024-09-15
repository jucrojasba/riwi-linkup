export function saveLocalStorage(name: string,data: string, ):void{
    localStorage.setItem(`${name}`, JSON.stringify(data));
}
export function clearLocalStorage():void{
    localStorage.clear();
}