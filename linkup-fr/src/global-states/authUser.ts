import { create } from 'zustand'; // Import create function from zustand for state management
import { persist } from 'zustand/middleware'; // Import persist middleware for persisting state

// Interface defining the structure of the authenticated user
export interface IAuthUser {
  name?: string; // Optional user name
  email: string; // User's email (required)
  token: string; // Authentication token
  role: number; // User's role (e.g., admin, user)
  provider?: string; // Optional authentication provider (e.g., Google, Facebook)
}

// Interface defining the state structure for the auth user
interface IAuthUserState {
  authUser: IAuthUser; // Current authenticated user
  setAuthUser: (value: IAuthUser) => void; // Function to set the authenticated user
}

// Creating the Zustand store with persistence
export const useAuthUser = create<IAuthUserState>()(
  persist(
    (set) => ({
      authUser: { // Initial state for authUser
        name: "", // Default name
        email: "", // Default email
        token: "", // Default token
        role: 0, // Default role (0 might represent a guest)
        provider: "" // Default provider
      },
      setAuthUser: (value: IAuthUser) => // Function to update the authUser state
        set(() => ({
          authUser: value // Update authUser with the provided value
        })),
    }),
    {
      name: 'auth-user-storage', // Key for local storage
    }
  )
);
