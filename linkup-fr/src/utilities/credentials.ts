export default function saveCredentials(credentials: {name:string, email: string, token:string}):void{
    localStorage.setItem("credientals", JSON.stringify(credentials));
}