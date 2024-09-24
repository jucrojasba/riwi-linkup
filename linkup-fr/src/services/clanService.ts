import { IClan, IClans } from "@/UI/interfaces/clanInterface"; // Importing interfaces for clan data
import fetchApi from "@/utilities/fetchApi"; // Importing a utility function for API fetching

// Function to fetch clans from the API
export async function getClansService(): Promise<null | IClan[] | undefined> {
    const clans = await fetchApi("/api/clans"); // Sending a GET request to fetch clans

    // Check if clans data was successfully retrieved
    if (!clans) {
        console.log({ message: "Error to get Clans" }); // Log error if fetching failed
        return null; // Return null if there's an error
    }

    // Map over the fetched clans data to filter and format it
    const filteredClan = clans.data.map((clan: Partial<IClan>) => ({
        id: clan.id,       // Extracting id
        name: clan.name,   // Extracting name
        label: clan.name,  // Setting label to name (could be adjusted if needed)
        checked: false     // Initializing checked to false
    }));

    return filteredClan; // Return the formatted clan data
}
