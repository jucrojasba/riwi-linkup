"use client";
import { useLayoutEffect, useState } from "react";
import { routes } from "./routes";
import "./routeStyles.css";
import useNavigate from "@/utilities/NavigateTo";
import { CircularLoader } from "@/UI/components/atoms";
import { useSession } from "next-auth/react";
import { saveLocalStorage } from "@/utilities/LocalStorage";

export default function Route({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState<boolean>(true); // Estado de loading
    const navigate = useNavigate();
    const [path, setPath] = useState<string>("");
    const { data: session, status } = useSession();

    // Obtener el path actual cuando el componente se monta
    useLayoutEffect(() => {
        if (typeof window !== "undefined") {
            const currentPath = window.location.pathname;
            setPath(currentPath);
        }
    }, []);

    // Ejecutar la lógica de verificación de rutas y autenticación
    useLayoutEffect(() => {
        if (path) {
            const token = localStorage.getItem("token");
            const isPrivateRoute = routes.privateRoutes.find((route) => route.path === path);
            const isPublicRoute = routes.publicRoutes.find((route) => route.path === path);

            // Verificar si el usuario está autenticado y redirigir si es necesario
            if ((path === "/login" || path === "/" || path === "/register") && token) {
                console.log("Token exists, redirecting to dashboard");
                navigate("/dashboard");
            } else if (isPrivateRoute && !token) {
                console.log("Access denied: Private route requires authentication");
                navigate("/login");
            } else {
                // Si la ruta es pública o el usuario tiene acceso, finaliza la carga
                setLoading(false);
            }
        }
    }, [path, navigate]);

    // Mostrar cargador mientras se verifica la ruta y la autenticación
    if (loading) {
        return <CircularLoader flag={loading} />;
    }

    // Mostrar el contenido solo después de que la lógica se haya ejecutado
    return <>{children}</>;
}
