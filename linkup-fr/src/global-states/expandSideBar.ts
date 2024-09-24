import { create } from "zustand"; // Import create function from Zustand for state management
import { persist } from "zustand/middleware"; // Import persist middleware to allow state persistence

// Interface defining the structure for the expand state
interface IExpandState {
    expand: boolean; // Boolean to track whether the element is expanded or not
    setExpand: (value: boolean) => void; // Function to update the expand state
}

// Creating the Zustand store with persistence for the expand state
export const useExpand = create<IExpandState>()(
    persist(
        (set) => ({
            expand: false, // Initial state set to false, meaning not expanded
            setExpand: (value: boolean) => // Function to update the expand state
                set(() => ({ expand: value })) // Update the expand state with the provided value
        }),
        {
            name: 'expand-storage', // Key for local storage to persist the expand state
        }
    )
);
