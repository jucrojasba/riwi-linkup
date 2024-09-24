import { ICoderComplet } from "@/app/api/interfaces/ICoderInterface";
import { ICoder, ICoderBack } from "@/UI/interfaces/ICoderInterface";
import fetchApi from "@/utilities/fetchApi";

// Get all coders
export async function getCodersService(): Promise<ICoder[] | null> {
  const data = await fetchApi("api/coders");
  if (!data) return null;

  const filteredCoders = data.map((coder: Partial<ICoder>) => ({
    id: coder.id!,
    urlImage: coder.urlImage!,
    name: coder.name!,
    birthday: coder.birthday!,
  }));

  return filteredCoders;
}

// Delete a coder by ID
export async function deleteCoderService(coder_id: number): Promise<void> {
  console.log("Deleting coder with ID:", coder_id);
  await fetchApi(`/api/coders/${coder_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Update a coder's information
export async function updateCoderService(coderUpdate: ICoderComplet, coder_id: number): Promise<string> {
  const response = await fetch(`/api/coders/${coder_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(coderUpdate),
  });

  return response.text();
}

// Get count of coders in training
export async function getCodersInTraining(): Promise<number | null> {
  const codersTraining = await fetchApi(`api/codersTraining`);
  if (!codersTraining) return null;

  return codersTraining.data;
}

// Get count of frontend coders
export async function getCodersFrontend(): Promise<number | null> {
  const codersFrontend = await fetchApi(`api/codersFrontend`);
  if (!codersFrontend) return null;

  return codersFrontend.data;
}

// Get count of backend coders
export async function getCodersBackend(): Promise<number | null> {
  const codersBackend = await fetchApi(`api/codersBackend`);
  if (!codersBackend) return null;

  return codersBackend.data;
}

// Get coder by ID
export async function getCoderByIdService(id: number): Promise<ICoderBack | { message: string }> {
  const coder = await fetchApi(`/api/coders/${id}`);
  if (!coder) return { message: "Coder not found" };

  return coder.data;
}

// Create a new coder
export async function createCoderService(coderCreate: ICoderComplet): Promise<ICoder | { message: string }> {
  const coder = await fetchApi(`/api/coders/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(coderCreate),
  });

  if (!coder) return { message: "Error creating coder" };
  
  return coder.data;
}
