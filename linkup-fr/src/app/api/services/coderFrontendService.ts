export async function getCodersFrontendService():Promise<number | undefined | {message: string}>{
    try{
        const response = await fetch("https://linkupv1-production.up.railway.app/api/Dashboard/frontend-coders");
        if(!response.ok) throw new Error("Error with the response");
        const data = await response.json();
        return data;
    }catch(error){
        return ({message: "Error with the getCodersFrontendService"})
    }
}