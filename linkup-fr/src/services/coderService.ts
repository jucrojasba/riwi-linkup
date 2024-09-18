import { ICoder, ICoderBack } from "@/UI/interfaces/ICoderInterface";
import { IUser } from "@/UI/interfaces/IUserInterface";
import fetchApi from "@/utilities/fetchApi";

export async function getCodersService(): Promise<ICoder[] | undefined> {
  const data = await fetchApi("https://linkupv1-production.up.railway.app/api/v2/CodersControllerV2");
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
): Promise<IUser[] | undefined> {
  const data = await fetchApi(`http://localhost:5000/coders/${coder_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!data) return;
  return data;
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