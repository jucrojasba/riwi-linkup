"use client"; // Indicates that this component is a client component in Next.js

import "./forgotPasswordStyles.css"; // Import CSS styles specific to the Forgot Password view
import Route from "@/routes/route"; // Import a custom Route component for navigation
import { AuthLayout, DashboardCardsContainer } from "@/UI/components/organisms"; // Import layout and container components
import { useLanguage } from "@/global-states/language-mode"; // Import a hook for language state management
import { UtilityRightButtons } from "@/UI/components/molecules"; // Import utility buttons for the UI
import { RiwiLogo } from "@/UI/components/atoms"; // Import the logo component
import ForgotPasswordForm from "@/UI/components/molecules/ForgotPasswordForm/ForgotPasswordForm"; // Import the form for password recovery
import { useDarkMode } from "@/global-states/dark-mode"; // Import a hook for dark mode state management
import Image from "next/image"; // Import Next.js Image component for optimized images

export default function ForgotPasswordView() {
    // Get the current language setting from the global state
    const language = useLanguage((state) => state.language);
    
    // Get the current dark mode setting from the global state
    const DarkMode = useDarkMode((state) => state.DarkMode);
    
    return (
        <Route>
            <main className="main-forgot"> {/* Main container for the Forgot Password view */}
                <UtilityRightButtons responsive={true} isDarkMode={DarkMode} /> {/* Utility buttons for additional actions */}
                <RiwiLogo isDarkMode={DarkMode} responsive={true} /> {/* Display the logo, adjusting for dark mode */}
                <AuthLayout isDarkMode={DarkMode} language={language} /> {/* Auth layout for consistent styling */}
                
                <section className={DarkMode ? "dark-mode" : "forgot-password-section"}> {/* Conditional class for styling based on dark mode */}
                    {/* Optional image section for illustration (commented out) */}
                    {/* <div className="section-image">
                        <Image className="image" src={"/images/test.png"} alt="coderLogin" width={400} height={400} />
                    </div> */}
                    
                    <ForgotPasswordForm /> {/* Render the form for users to reset their passwords */}
                </section>
            </main>
        </Route>
    );
}
