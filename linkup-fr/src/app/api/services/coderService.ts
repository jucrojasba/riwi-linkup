    import { ICoder, ICoderComplet, ICoderFilter } from "../interfaces/ICoderInterface";
    import fetchApi from "@/utilities/fetchApi"; // Tu utilidad para hacer fetch
    import { FilterOption, FilterState } from "@/UI/interfaces/Filter";
import { verifyExistsQueryParams } from "../utils/verifyExistsQueryParams";
import { FilterQuery } from "../interfaces/IFilterQueryInterface";

    export async function getCoderById(id:number):Promise<ICoder | {message: string}>{
        try{
            const response = await fetch(`https://linkupv1-production.up.railway.app/api/v1/Coders/${id}`);
            if(!response.ok)throw new Error(`Error with the response`);
            return await response.json();
        }catch(error){
            return ({message: `Error to getCoderById ${error}`})
        }
    }

    export async function deleteCoder(id:number):Promise<void>{
        try{
            const response = await fetch(`https://linkupv1-production.up.railway.app/api/v2/CodersControllerV2/${id}`, {
                method:"DELETE"
            });
            if(!response.ok) throw new Error("Error with the response");
            await response.json();
        }catch(error){
            console.log({message: "Error delete coder"})
        }
    }

    export async function createCoder(coder:ICoderComplet): Promise<ICoder | {message: string}>{
        try{
            const response = await fetch(`https://linkupv1-production.up.railway.app/api/v2/CodersControllerV2`,{
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(coder)
            });
            if(!response.ok)throw new Error(`Error with the response`);
            return await response.json();
        }catch(error){
            return ({message: `Error to createCoder ${error}`})
        }
    }

    export async function getCoders():Promise<ICoder[] | {message: string}>{
        try{
            const response = await fetch(`https://linkupv1-production.up.railway.app/api/v1/Coders`);
            if(!response.ok)throw new Error(`Error with the response`);
            return await response.json();
        }catch(error){
            return ({message: `Error to getCoders ${error}`})
        }
    }

    export async function filterCoders(query:string):Promise<ICoderFilter[] | {message:string}> {
        const endPoint:string = "https://linkupv1-production.up.railway.app/api/v3/CodersControllerV3/filter"
        const completeQuery:string = `${endPoint}?${query}`;
        const codersFilter = await fetch(completeQuery, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return codersFilter.json();
    }
