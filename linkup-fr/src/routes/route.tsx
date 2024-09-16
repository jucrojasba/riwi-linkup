"use client";
import { useLayoutEffect, useState } from "react";
import { routes } from "./routes";
import "./routeStyles.css";
import useNavigate from "@/utilities/NavigateTo";
import { CircularLoader } from "@/UI/components/atoms";

export default function Route({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState<boolean>(true); // States for loading
    const navigate = useNavigate();
    const [path, setPath] = useState<string>("");

    // Ejecutar cuando el componente se monta
    useLayoutEffect(() => {
        if (typeof window !== "undefined") {
            setPath(window.location.pathname);
            setLoading(false); // Set loading to false
        }
    }, []);

    // Ejecutar la lógica de verificación de rutas y autenticación
    useLayoutEffect(() => {
        if (path) {
            // Lógica de verificación de rutas
            const isPrivateRoute = routes.privateRoutes.find((route) => route.path === path);
            const isPublicRoute = routes.publicRoutes.find((route) => route.path === path);

            // Verificar si el usuario está autenticado y redirigir si es necesario
            if ((path === "/login" || path === "/" || path === "/register") && token) {
                console.log("Token exists, redirecting to dashboard");
                navigate("/dashboard");
            } else if (isPrivateRoute && !token) {
                console.log("Access denied: Private route requires authentication");
                navigate("/login");
                return;
            }

            if (isPublicRoute) {
                setLoading(false); // Permitir el renderizado solo si es una ruta pública o si ya se verificó todo
                return;
            }
        }
    }, [path, navigate]); 

    // Show loading while loading the routes
    if (loading) {
        return (
            <CircularLoader flag={loading} />
        )
    }

    // Mostrar el contenido solo después de la verificación
    return <>{children}</>;
}