"use client";
import { useEffect, useState } from "react";
import { routes } from "./routes";
import "./routeStyles.css";
import useNavigate from "@/utilities/NavigateTo";
import { CircularLoader } from "@/UI/components/atoms";

export default function Route({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState<boolean>(true); // States for loading
    const navigate = useNavigate();
    const [path, setPath] = useState<string>("");

    // Only execute one time when the componente is mounted
    useEffect(() => {
        if (typeof window !== "undefined") {
            setPath(window.location.pathname);
            setLoading(false); // Set loading to false
        }
    }, []); // Dependencias vacías para ejecutar solo en el montaje

    useEffect(() => {
        if (path) { // 
            const isPrivateRoute = routes.privateRoutes.find((route) => route.path === path);
            const isPublicRoute = routes.publicRoutes.find((route) => route.path === path);
            const token = localStorage.getItem("token");

            if ((path === "/login" || path === "/" || path === "/register") && token) {
                console.log("Token exists, redirecting to dashboard");
                navigate("/dashboard");
                return;
            }

            if (isPrivateRoute && !token) {
                console.log("Access denied: Private route requires authentication");
                navigate("/login");
                return;
            }

            if (isPublicRoute) {
                return;
            }
        }
    }, [path, navigate]); // El efecto depende del `path` y `navigate`

    // Mostrar un loader mientras se determina el path
    if (loading) {
        return (
            <CircularLoader flag={loading} />
        )
    }

    return <>{children}</>;
}
