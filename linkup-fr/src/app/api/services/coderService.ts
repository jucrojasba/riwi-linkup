    import { ICoder } from "../interfaces/ICoderInterface";

    export async function getCoderById(id:number):Promise<ICoder | {message: string}>{
        try{
            const response = await fetch(`https://linkupv1-production.up.railway.app/api/v1/Coders/${id}`);
            if(!response.ok)throw new Error(`Error with the response`);
            return await response.json();
        }catch(error){
            return ({message: `Error to getCoderById ${error}`})
        }
    }