interface IOptionsProps{
    method?: string,
    headers?: {},
    body?: string
}

export default async function fetchApi(url:string,options?:IOptionsProps):Promise<any>{
    try{
        const url:string = "http://192.168.88.72:5298/" + path;
        console.log(url);
        const response = await fetch(url,options);
        if(!response.ok)throw new Error("Error with the response");
        return await response.json();
    }catch(error){
        console.log({message: "Error with the fetchApi", error})
    }
}