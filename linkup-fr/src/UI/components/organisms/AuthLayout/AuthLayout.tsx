'use client';

import React, { useEffect, useState } from 'react';
import RiwiLogo from "../../atoms/RiwiLogo/RiwiLogo";
import MobileNavbar from "../../molecules/MobileNavbar/MobileNavbar";
import NavbarHome from "../../molecules/NavbarHome/NavbarHome";
import UtilityRightButtons from "../../molecules/UtilityRightButtons/UtilityRightButtons";

interface IAuthLayoutProps {
    isDarkMode: boolean;
    language: boolean;
}

const AuthLayout: React.FC<IAuthLayoutProps> = ({ isDarkMode, language }) => {
    const [isMediumScreen, setIsMediumScreen] = useState(false);

    useEffect(() => {
        // Obtiene el valor de la variable CSS --breakpoint-md
        const breakpoint = getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-md').trim();
        const mediaQuery = window.matchMedia(`(max-width: ${breakpoint})`);
        const handleResize = () => setIsMediumScreen(mediaQuery.matches);

        // Inicializa el estado
        handleResize();

        // Agrega el listener
        mediaQuery.addEventListener('change', handleResize);

        // Cleanup
        return () => {
            mediaQuery.removeEventListener('change', handleResize);
        };
    }, []);

    return (
        <>
            {isMediumScreen ? (
                <MobileNavbar isDarkMode={isDarkMode} language={language}/>
            ) : (
                <>
                    <NavbarHome isDarkMode={isDarkMode} />
                    <UtilityRightButtons isDarkMode={isDarkMode} />
                    <RiwiLogo isDarkMode={isDarkMode} />
                </>
            )}
        </>
    );
};

export default AuthLayout;
