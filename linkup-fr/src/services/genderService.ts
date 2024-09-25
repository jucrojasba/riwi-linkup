import { IGender } from "@/UI/interfaces/GenderInterface"; // Importing the IGender interface for type definitions
import fetchApi from "@/utilities/fetchApi"; // Importing the fetchApi utility for making API calls

// This function retrieves a list of genders from the API
export async function getGendersService(): Promise<IGender[] | null> {
    // Making the API call to fetch genders
    const genders = await fetchApi("api/genders");

    // Checking if the response is null or undefined
    if (!genders) {
        console.log({ message: "Error to get genders" }); // Logging an error message for debugging
        return null; // Returning null if there was an error fetching genders
    }

    // Mapping the retrieved gender data to create an array of filtered genders
    const filteredGender = genders.data.map((gender: Partial<IGender>) => ({
        id: gender.id, // Extracting the gender ID
        name: gender.name, // Extracting the gender name
        label: gender.name, // Setting the label to the gender name (could be used for UI display)
        checked: false // Initializing the checked property to false
    }));

    return filteredGender; // Returning the array of filtered genders
}
