interface IOptionsProps{
    method?: string,
    headers?: {},
    body?: string
}

export default async function fetchApi(url:string,options?:IOptionsProps):Promise<any>{
    try{
        const response = await fetch(url,options);
        if(!response.ok)throw new Error("Error with the response");
        return await response.json();
    }catch(error){
        console.log({message: "Error with the fetchApi", error})
    }
}