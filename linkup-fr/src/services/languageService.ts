import { ILanguage } from "@/UI/interfaces/languageInterface"; // Importing the ILanguage interface for type definitions
import fetchApi from "@/utilities/fetchApi"; // Importing the fetchApi utility for making API calls

// This function retrieves a list of languages from the API
export async function getLanguagesService(): Promise<ILanguage[] | null> {
    // Making the API call to fetch languages
    const languages = await fetchApi("api/languages");

    // Checking if the response is null or undefined
    if (!languages) {
        console.log({ message: "Error to get languages" }); // Logging an error message for debugging
        return null; // Returning null if there was an error fetching languages
    }

    // Mapping the retrieved language data to create an array of filtered languages
    const filteredLanguage = languages.data.map((language: Partial<ILanguage>) => ({
        id: language.id, // Extracting the language ID
        name: language.name, // Extracting the language name
        label: language.name, // Setting the label to the language name (could be used for UI display)
        checked: false // Initializing the checked property to false
    }));

    return filteredLanguage; // Returning the array of filtered languages
}
