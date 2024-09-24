import { create } from 'zustand'; // Import the create function from Zustand for state management

// Interface defining the structure for the loading state
interface ILoadPage {
    load: boolean; // Boolean to track if the page is loading
    setLoad: (value: boolean) => void; // Function to update the loading state
}

// Creating the Zustand store for the loading state
export const useLoadPage = create<ILoadPage>((set) => ({
    load: false, // Initial state set to false, meaning the page is not loading
    setLoad: (value) => set(() => ({ load: value })) // Function to update the loading state with the provided value
}));
