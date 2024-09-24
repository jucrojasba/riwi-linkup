"use client"; // Indicates that this is a client-side component in Next.js

import { RiwiLogo } from "@/UI/components/atoms"; // Importing the Riwi logo component
import "./registerStyles.css"; // Importing CSS styles for the registration view
import { NavbarHome, RegisterForm, UtilityRightButtons } from "@/UI/components/molecules"; // Importing various UI components
import { AuthLayout } from "@/UI/components/organisms"; // Importing the layout for authentication-related views
import { useDarkMode } from "@/global-states/dark-mode"; // Hook for managing dark mode state
import { useLanguage } from "@/global-states/language-mode"; // Hook for managing language state
import Route from "@/routes/route"; // Importing the Route component for navigation handling
import Image from "next/image"; // Importing Next.js Image component for optimized image loading

// Define the RegisterView functional component
export default function RegisterView(): JSX.Element {
    // Retrieve the current dark mode state and selected language
    const DarkMode = useDarkMode((state) => state.DarkMode);
    const language = useLanguage((state) => state.language);

    return (
        <Route> {/* Wrap the main content in the Route component for routing purposes */}
            <main className="mainRegister">
                {/* Utility buttons for responsiveness and dark mode */}
                <UtilityRightButtons isDarkMode={DarkMode} responsive={true} />
                {/* Display the Riwi logo */}
                <RiwiLogo isDarkMode={DarkMode} responsive={true} />
                {/* Layout for authentication-related components */}
                <AuthLayout isDarkMode={DarkMode} language={language} />
                <section className={DarkMode ? "dark-mode" : "mainRegister-section"}>
                    {/* Image section displaying a relevant image for registration */}
                    <div className="section-image">
                        <Image 
                            className="image" 
                            src={"/images/coderRegister01.png"} 
                            alt="coderRegister-coders" 
                            width={600} 
                            height={600} 
                        />
                    </div>
                    {/* Registration form component */}
                    <RegisterForm />
                </section>
            </main>
        </Route>
    );
}
