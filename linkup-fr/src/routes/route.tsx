"use client"; // Indicates that this is a client component
import { useLayoutEffect, useState } from "react"; // Importing necessary hooks
import { routes } from "./routes"; // Importing route definitions
import "./routeStyles.css"; // Importing styles for routes
import useNavigate from "@/utilities/NavigateTo"; // Custom hook for navigation
import { CircularLoader } from "@/UI/components/atoms"; // Importing a loading spinner component
import { useSession } from "next-auth/react"; // Hook for managing session state
import { saveLocalStorage } from "@/utilities/LocalStorage"; // Utility for saving data to local storage

export default function Route({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState<boolean>(true); // Loading state for route verification
    const navigate = useNavigate(); // Custom navigation function
    const [path, setPath] = useState<string>(""); // State for the current path
    const { data: session, status } = useSession(); // Session data and status from next-auth

    // Get the current path when the component mounts
    useLayoutEffect(() => {
        if (typeof window !== "undefined") { // Check if running in the browser
            const currentPath = window.location.pathname; // Get the current pathname
            setPath(currentPath); // Set the current path state
        }
    }, []);

    // Run logic for route checking and authentication
    useLayoutEffect(() => {
        if (path) { // Check if the path is available
            const token = localStorage.getItem("token"); // Retrieve the token from local storage
            const isPrivateRoute = routes.privateRoutes.find((route) => route.path === path); // Check if the current path is a private route
            const isPublicRoute = routes.publicRoutes.find((route) => route.path === path); // Check if the current path is a public route

            // Check if the user is authenticated and redirect if necessary
            if ((path === "/login" || path === "/" || path === "/register") && token) {
                console.log("Token exists, redirecting to dashboard"); // Log message for debugging
                navigate("/dashboard"); // Redirect to the dashboard
            } else if (isPrivateRoute && !token) {
                console.log("Access denied: Private route requires authentication"); // Log message for debugging
                navigate("/login"); // Redirect to login page if trying to access a private route without authentication
            } else {
                // If the route is public or the user has access, finish loading
                setLoading(false); // Set loading to false, indicating the check is complete
            }
        }
    }, [path, navigate]); // Dependencies: path and navigate function

    // Show loader while verifying route and authentication
    if (loading) {
        return <CircularLoader flag={loading} />; // Display loading spinner
    }

    // Render the children only after the logic has been executed
    return <>{children}</>; // Return the children components
}
