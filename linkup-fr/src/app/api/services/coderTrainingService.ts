export async function getCoderTrainingService():Promise<number | undefined | {message: string}>{
    try{
        const response = await fetch("https://linkupv1-production.up.railway.app/api/Dashboard/coders-in-training");
        if(!response.ok) throw new Error("Error with the response");
        const data = await response.json();
        console.log('data servicio',data);
        return data;
    }catch(error){
        return ({message: "Error with the getCoderTrainingService"})
    }
}