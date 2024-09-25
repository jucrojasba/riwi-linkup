'use client'; // Indicates that this is a client-side component in Next.js

import "./loginStyles.css"; // Import CSS styles specific to the login view
import { LogInForm, NavbarHome, UtilityRightButtons } from "@/UI/components/molecules"; // Import necessary components
import { AuthLayout } from "@/UI/components/organisms"; // Import the layout component for authentication
import { useDarkMode } from "@/global-states/dark-mode"; // Hook to manage dark mode state
import Image from "next/image"; // Import Next.js Image component for optimized images
import Route from "@/routes/route"; // Import the Route component for handling navigation
import { useLanguage } from "@/global-states/language-mode"; // Hook to manage language state
import { RiwiLogo } from "@/UI/components/atoms"; // Import the logo component

// Define the LoginView functional component
export default function LoginView(): JSX.Element {
    // Get the current dark mode state and language preference
    const DarkMode = useDarkMode((state) => state.DarkMode);
    const language = useLanguage((state) => state.language);
    
    return (
        <Route> {/* Wrap the main content in the Route component for navigation */}
            <main className="mainLogin"> {/* Main container for the login view */}
                <UtilityRightButtons responsive={true} isDarkMode={DarkMode} /> {/* Utility buttons for actions */}
                <RiwiLogo isDarkMode={DarkMode} responsive={true} /> {/* Logo displayed at the top */}
                <AuthLayout isDarkMode={DarkMode} language={language} /> {/* Authentication layout */}
                <section className={DarkMode ? "dark-mode" : "mainLogin-section"}> {/* Section that changes style based on dark mode */}
                    <div className="section-image"> {/* Container for the image */}
                        <Image className="image" src={"/images/test.png"} alt="coderLogin" width={400} height={400} /> {/* Image for visual representation */}
                    </div>
                    <LogInForm /> {/* The login form component where users can enter their credentials */}
                </section>
            </main>
        </Route>
    );
}
