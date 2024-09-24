import { useAuthUser } from "@/global-states/authUser"; // Importing the custom hook for authentication state
import { useRouter } from "next/navigation"; // Importing the router from Next.js for navigation

// Define the AccessControl component, which takes children as props
export default function AccessControl({children}: {children: React.ReactNode}) {
    // Retrieve the authenticated user state
    const { authUser } = useAuthUser();
    // Get the router object for navigation
    const router = useRouter();
    
    // If the user's email is empty, redirect to the login page
    if (authUser.email === "") {
        router.push("/login");
        return null; // Return null while redirecting
    }

    // If the user is authenticated, render the children components
    return (
        <>{children}</>
    );
}
