import { ISector } from "@/UI/interfaces/ISectorInterface";
import fetchApi from "@/utilities/fetchApi";


export async function getSectorService(): Promise<
  { data: ISector[] } | null | undefined | { message: string }
> {
  const data = await fetchApi("/api/sectors");
  return data;
}
 
