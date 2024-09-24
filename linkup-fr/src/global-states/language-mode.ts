import { create } from 'zustand'; // Import the create function from Zustand for state management
import { persist } from 'zustand/middleware'; // Import persist middleware for state persistence

// Interface defining the structure for the language state
interface ILanguageState {
  language: boolean; // Boolean to track the selected language state
  setLanguage: (value: boolean) => void; // Function to update the language state
}

// Creating the Zustand store with persistence for the language state
export const useLanguage = create<ILanguageState>()(
  persist(
    (set) => ({
      language: false, // Initial state set to false, meaning the default language is not selected
      setLanguage: (value) => set({ language: value }), // Function to update the language state with the provided value
    }),
    {
      name: 'language-storage', // Key for local storage to persist the language state
    }
  )
);
