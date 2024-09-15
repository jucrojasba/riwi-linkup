"use client";
import { useLayoutEffect, useState } from "react";
import { routes } from "./routes";
import "./routeStyles.css";
import useNavigate from "@/utilities/NavigateTo";
import { CircularLoader } from "@/UI/components/atoms";

export default function Route({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState<boolean>(true); // Estado de loading
    const navigate = useNavigate();
    const [path, setPath] = useState<string>("");

    // Ejecutar cuando el componente se monta
    useLayoutEffect(() => {
        if (typeof window !== "undefined") {
            const currentPath = window.location.pathname;
            setPath(currentPath);
        }
    }, []);

    useLayoutEffect(() => {
        if (path) {
            // Lógica de verificación de rutas
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
                setLoading(false); // Permitir el renderizado solo si es una ruta pública o si ya se verificó todo
                return;
            }
        }
    }, [path, navigate]);

    // Mostrar cargador mientras se verifica la ruta y la autenticación
    if (loading) {
        return <CircularLoader flag={loading} />;
    }

    // Mostrar el contenido solo después de la verificación
    return <>{children}</>;
}
