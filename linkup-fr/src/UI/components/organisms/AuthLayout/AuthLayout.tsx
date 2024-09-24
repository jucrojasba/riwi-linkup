'use client';

import React, { useEffect, useState } from 'react';
import RiwiLogo from "../../atoms/RiwiLogo/RiwiLogo"; // Importing the Riwi logo component
import MobileNavbar from "../../molecules/MobileNavbar/MobileNavbar"; // Importing the mobile navbar component
import NavbarHome from "../../molecules/NavbarHome/NavbarHome"; // Importing the home navbar component
import UtilityRightButtons from "../../molecules/UtilityRightButtons/UtilityRightButtons"; // Importing utility buttons for the layout

// Define props for the AuthLayout component
interface IAuthLayoutProps {
    isDarkMode: boolean; // Indicates if dark mode is enabled
    language: boolean; // Indicates the current language (true for Spanish, false for English)
}

// Functional component for authentication layout
const AuthLayout: React.FC<IAuthLayoutProps> = ({ isDarkMode, language }) => {
    const [isMediumScreen, setIsMediumScreen] = useState(false); // State to track screen size

    useEffect(() => {
        // Retrieve the value of the CSS variable --breakpoint-md
        const breakpoint = getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-md').trim();
        const mediaQuery = window.matchMedia(`(max-width: ${breakpoint})`); // Create a media query
        const handleResize = () => setIsMediumScreen(mediaQuery.matches); // Update state based on media query match

        // Initialize the state
        handleResize();

        // Add event listener for changes in screen size
        mediaQuery.addEventListener('change', handleResize);

        // Cleanup function to remove the event listener on unmount
        return () => {
            mediaQuery.removeEventListener('change', handleResize);
        };
    }, []);

    return (
        <>
            {/* Conditional rendering based on screen size */}
            {isMediumScreen ? (
                // Render mobile navbar for medium or smaller screens
                <MobileNavbar isDarkMode={isDarkMode} language={language} />
            ) : (
                <>
                    {/* Render standard navbar and utility buttons for larger screens */}
                    <NavbarHome isDarkMode={isDarkMode} />
                    <UtilityRightButtons isDarkMode={isDarkMode} />
                    <RiwiLogo isDarkMode={isDarkMode} />
                </>
            )}
        </>
    );
};

export default AuthLayout;
