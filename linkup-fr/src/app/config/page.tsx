'use client'; // Indicates that this file is a client component in Next.js

import { useLanguage } from '@/global-states/language-mode'; // Hook to access language state
import { useDarkMode } from "@/global-states/dark-mode"; // Hook to access dark mode state
import { DashboardLayout } from '@/UI/components/organisms'; // Importing the DashboardLayout component
import SectionProfile from '@/UI/components/organisms/SectionProfile/SectionProfile'; // Importing SectionProfile component
import { useAuthUser } from '@/global-states/authUser'; // Hook to access authenticated user state
import Route from '@/routes/route'; // Importing Route component for handling routes

// Main functional component for the Dashboard View
export default function DashboardView() {
    // Logic to retrieve states using hooks
    const DarkMode = useDarkMode((state) => state.DarkMode); // Get the current dark mode status
    const language = useLanguage((state) => state.language); // Get the current language setting

    // Set the title and subtitle based on the current language
    const titleView = language ? "Mi Perfil" : "My Profile"; // Conditional title
    const subtitle = language ? "Información Personal" : "Personal Information"; // Conditional subtitle
    
    const AuthUser = useAuthUser((state) => state.authUser); // Get the authenticated user info

    return (
        <Route> {/* Wraps the main content to manage routing */}
            <main>
                {/* Dashboard layout that includes the profile section and other properties */}
                <DashboardLayout 
                    section={<SectionProfile isDarkMode={DarkMode} language={language} />} // Passes dark mode and language to SectionProfile
                    language={language} // Passes the current language to the layout
                    titleView={titleView} // Passes the title to the layout
                    subtitle={subtitle} // Passes the subtitle to the layout
                    isDarkMode={DarkMode} // Passes dark mode status to the layout
                />
            </main>
        </Route>
    );
}
