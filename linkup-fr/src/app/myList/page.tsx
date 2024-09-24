"use client"; // Indicates that this is a client-side component in Next.js

import { useDarkMode } from "@/global-states/dark-mode"; // Hook for managing dark mode state
import { useLanguage } from "@/global-states/language-mode"; // Hook for managing language state
import Route from "@/routes/route"; // Importing the Route component for navigation handling
import { DashboardLayout } from "@/UI/components/organisms"; // Importing the Dashboard layout component

// Define the MyList functional component
export default function MyList(): React.ReactNode {
    // Retrieve the current dark mode state and selected language
    const isDarkMode = useDarkMode((state) => state.DarkMode);
    const language = useLanguage((state) => state.language);
    
    return (
        <Route> {/* Wrap the main content in the Route component for routing purposes */}
            <DashboardLayout 
                section={<div>dasd</div>} // Placeholder content; replace with actual list rendering
                language={language} // Pass the current language to the layout
                isDarkMode={isDarkMode} // Pass the current dark mode state to the layout
                titleView="MyList" // Title displayed in the layout
                subtitle="List of coders selected" // Subtitle displayed in the layout
            />
        </Route>
    );
}
