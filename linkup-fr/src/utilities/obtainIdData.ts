// Importing the IGender interface from the GenderInterface file
import { IGender } from "@/UI/interfaces/GenderInterface";
// Importing the ISector interface from the SectorInterface file
import { ISector } from "@/UI/interfaces/ISectorInterface";

/**
 * Function to obtain the ID of a gender based on its name.
 * @param {IGender[]} data - An array of gender objects that implement the IGender interface.
 * @param {string} valueSelect - The name of the selected gender whose ID we want to find.
 * @returns {number} - Returns the ID of the selected gender if found; otherwise, returns 0.
 */
export function obtainIdData(data: IGender[], valueSelect: string) {
  // Using the find method to search for the gender object that matches the provided name.
  const selectedGender = data.find((g: IGender) => g.name === valueSelect);
  
  // Returning the ID if the selected gender is found; otherwise, returning 0.
  return selectedGender ? selectedGender.id : 0;
}

/**
 * Function to obtain the ID of a sector based on its name.
 * @param {ISector[]} data - An array of sector objects that implement the ISector interface.
 * @param {string} valueSelect - The name of the selected sector whose ID we want to find.
 * @returns {number} - Returns the ID of the selected sector if found; otherwise, returns 0.
 */
export function obtainIdSectors(data: ISector[], valueSelect: string) {
  // Using the find method to search for the sector object that matches the provided name.
  const selectedSector = data.find((g: ISector) => g.name === valueSelect);
  
  // Returning the ID if the selected sector is found; otherwise, returning 0.
  return selectedSector ? selectedSector.id : 0;
}
