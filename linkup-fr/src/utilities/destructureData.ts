import { IClanShort } from "@/UI/interfaces/clanInterface"; // Importing the IClanShort interface

// Function to transform an array of clan data
export function destructureData(data: any) {
    // Map over the data array to create a new array of objects
    return data.map((value: IClanShort) => ({
        id: value.id,       // Extracting the id property from each clan
        name: value.name    // Extracting the name property from each clan
    }));
}
