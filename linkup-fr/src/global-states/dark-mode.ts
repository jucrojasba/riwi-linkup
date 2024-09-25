import { create } from 'zustand'; // Import create function from Zustand for state management
import { persist } from 'zustand/middleware'; // Import persist middleware to allow state persistence

// Interface defining the structure of the dark mode state
interface IDarkModeState {
  DarkMode: boolean; // Boolean value to track if dark mode is enabled
  setDarkMode: (value: boolean) => void; // Function to set the dark mode state
}

// Creating the Zustand store with persistence for dark mode
export const useDarkMode = create<IDarkModeState>()(
  persist(
    (set) => ({
      DarkMode: false, // Initial state for dark mode (false indicates light mode)
      setDarkMode: (value) => // Function to update the DarkMode state
        set({ DarkMode: value }), // Update the DarkMode value with the provided argument
    }),
    {
      name: 'dark-mode-storage', // Key for local storage to persist dark mode state
    }
  )
);
