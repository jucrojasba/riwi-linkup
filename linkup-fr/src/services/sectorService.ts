import { ISector } from "@/UI/interfaces/ISectorInterface"; // Importing the ISector interface for type definitions
import fetchApi from "@/utilities/fetchApi"; // Importing the fetchApi utility for making API calls

// This function retrieves a list of sectors from the API
export async function getSectorService(): Promise<
  { data: ISector[] } | null | undefined | { message: string } // Defining the possible return types
> {
  // Making the API call to fetch sectors
  const data = await fetchApi("/api/sectors");
  
  // Returning the fetched data, which could be an array of sectors, null, or an error message
  return data;
}
