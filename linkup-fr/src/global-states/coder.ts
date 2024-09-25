import { ICoder } from "@/UI/interfaces/ICoderInterface"; // Import ICoder interface from the specified path
import { create } from "zustand"; // Import create function from Zustand for state management
import { persist } from "zustand/middleware"; // Import persist middleware for persisting state

// Interface defining the structure of the coder state
interface ICoderState {
    CodersFilter: Partial<ICoder>[]; // Array to hold filters for coders, can contain partial coder objects
    setCodersFilter: (value: Partial<ICoder>[]) => void; // Function to set the coders filter
}

// Creating the Zustand store with persistence
export const useCodersFilter = create<ICoderState>()(
    persist(
        (set) => ({
            CodersFilter: [ // Initial state for CodersFilter
                {
                    id: 0, // Default id for the coder (0 might indicate no specific coder)
                    name: "", // Default name (empty string)
                    urlImage: "", // Default URL for the coder's image (empty string)
                    birthday: "" // Default birthday (empty string)
                }
            ],
            setCodersFilter: (value) => // Function to update the CodersFilter state
                set(() => ({ CodersFilter: value })) // Update CodersFilter with the provided value
        }),
        {
            name: 'coders-filter-storage', // Key for local storage
        }
    )
);
