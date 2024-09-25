import { create } from "zustand"; // Importing Zustand's create function for state management

// Interface defining the structure for tech skill state
interface ITechSkillState {
    techSkill: string | undefined; // The tech skill value, can be a string or undefined
    setTechSkill: (value: string | undefined) => void | undefined; // Function to set the tech skill value
}

// Creating the Zustand store for managing tech skills
export const useTechSkill = create<ITechSkillState>((set) => ({
    techSkill: "", // Initial tech skill state set to an empty string
    setTechSkill: (value: string | undefined) => set(() => ({ techSkill: value })) // Function to update tech skill state with the provided value
}));
