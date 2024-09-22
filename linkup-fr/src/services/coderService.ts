import { ICoderComplet } from "@/app/api/interfaces/ICoderInterface";
import { ICoder, ICoderBack } from "@/UI/interfaces/ICoderInterface";
import fetchApi from "@/utilities/fetchApi";

export async function getCodersService(): Promise<ICoder[] | undefined> {
  const data = await fetchApi("api/coders");
  if (!data) return;
  const filteredCoders = data.map((coder: Partial<ICoder>) => ({
    id: coder.id!,
    urlImage: coder.urlImage!,
    name: coder.name!,
    birthday: coder.birthday!,
  }));
  return filteredCoders;
}

export async function deleteCoderService(
  coder_id: number
): Promise<void> {
  console.log("id", coder_id)
  await fetchApi(`/api/coders/${coder_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function updateCoderService(coderUpate: ICoderComplet, coder_id:number):Promise<{message: string} | string>{
  try{
    const response = await fetch(`https://linkupv1-production.up.railway.app/api/v2/CodersControllerV2/${coder_id}`,{
      method: "PUT",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(coderUpate)
    });
  
    if(!response.ok){
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseText = await response.text();
    if (!responseText) {
      console.warn("Response empty of server");
      return "No data received from server";
    }
    return responseText;
  }catch(error){
    console.error("Error to update the coder:", error);
    return { message: error instanceof Error ? error.message : "Error unknow to udpate the coder" };
  }
}

export async function getCodersInTraining(): Promise<number | undefined> {
  const codersTraining = await fetchApi(
    `api/codersTraining`
  );
  if (!codersTraining) return;
  return codersTraining.data;
}

export async function getCodersFrontend(): Promise<number | undefined> {
  const codersFrontend = await fetchApi(
    `api/codersFrontend`
  );
  if (!codersFrontend) return;
  return codersFrontend.data;
}

export async function getCodersBackend(): Promise<number | undefined> {
  const codersBackend = await fetchApi(
    `api/codersBackend`
  );
  if (!codersBackend) return;
  return codersBackend.data;
}

  export async function getCoderByIdService(id:number): Promise< ICoderBack |{message:string}>{
    const coder = await fetchApi(`/api/coders/${id}`);
    if(!coder)return coder;
    return coder.data;
  }

  export async function createCoderService(coderCreate: ICoderComplet):Promise<ICoder | {message: string}>{
    const coder = await fetchApi(`/api/coders/`,{
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(coderCreate)
    });
    if(!coder)return coder;
    return coder.data;
  }