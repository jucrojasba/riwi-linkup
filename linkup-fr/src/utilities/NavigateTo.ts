"use client"; // Indicates that this module can use client-side features

// Importing the useRouter hook from Next.js for navigation
import { useRouter } from "next/navigation";

// Custom hook for navigation
const useNavigate = () => {
  // Getting the router object to manage navigation
  const router = useRouter();

  // Function to navigate to a specified path
  const navigate = (path: string) => {
    // Using the router's push method to change the current route
    router.push(path);
  };

  // Returning the navigate function for use in components
  return navigate;
};

// Exporting the custom navigation hook for use in other components
export default useNavigate;
