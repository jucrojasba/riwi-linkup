import { create } from "zustand"; // Import create function from Zustand for state management
import { persist } from "zustand/middleware"; // Import persist middleware to allow state persistence

// Interface defining the structure of individual data items
interface IData {
    id: number; // Unique identifier for the data item
    name: string; // Name associated with the data item
    label: string; // Label for display purposes
    checked: boolean; // Boolean to indicate if the item is checked
}

// Interface defining the structure of the loaded data
interface IDataBackLoad {
    genders: IData[]; // Array of gender data items
    clans: IData[]; // Array of clan data items
    languages: IData[]; // Array of language data items
    softSkills: IData[]; // Array of soft skill data items
    techSkills: IData[]; // Array of technical skill data items
}

// Interface defining the state structure for data loading
interface IDataBackLoadState {
    dataBack: IDataBackLoad; // Data back load structure
    setDataBackLoad: (value: IDataBackLoad) => void; // Function to update the data back load
}

// Creating the Zustand store with persistence for data loading
export const useDataBackLoad = create<IDataBackLoadState>()(
    persist(
        (set) => ({
            dataBack: {
                genders: [{ id: 0, name: "", label: "", checked: false }], // Initial state for genders
                clans: [{ id: 0, name: "", label: "", checked: false }], // Initial state for clans
                languages: [{ id: 0, name: "", label: "", checked: false }], // Initial state for languages
                softSkills: [{ id: 0, name: "", label: "", checked: false }], // Initial state for soft skills
                techSkills: [{ id: 0, name: "", label: "", checked: false }] // Initial state for technical skills
            },
            setDataBackLoad: (value: IDataBackLoad) => // Function to update the dataBack state
                set(() => ({
                    dataBack: value // Update the dataBack value with the provided argument
                }))
        }),
        {
            name: 'data-back-load-storage', // Key for local storage to persist the data loading state
        }
    )
);
