'use client'; // Indicates that this component is a client component in Next.js

import { useLanguage } from '@/global-states/language-mode'; // Hook to access the language state
import './dashboardStyle.css'; // Importing custom styles for the dashboard
import { useDarkMode } from "@/global-states/dark-mode"; // Hook to access the dark mode state
import { DashboardLayout } from '@/UI/components/organisms'; // Importing the DashboardLayout component
import SectionDashboard from '@/UI/components/organisms/SectionDashboard/SectionDashboard'; // Importing SectionDashboard component
import { useAuthUser } from '@/global-states/authUser'; // Hook to access authenticated user state
import Route from '@/routes/route'; // Importing Route component for handling routing

// Main functional component for the Dashboard View
export default function DashboardView() {
    // Logic to retrieve states using hooks
    const DarkMode = useDarkMode((state) => state.DarkMode); // Get the current dark mode status
    const language = useLanguage((state) => state.language); // Get the current language setting

    // Set the title and subtitle based on the current language
    const titleView = language ? "Tablero" : "Dashboard"; // Conditional title based on language
    const subtitle = language ? "Estadisticas Globales" : "General Stats"; // Conditional subtitle based on language

    return (
        <Route> {/* Wraps the main content to manage routing */}
            <main>
                {/* Dashboard layout that includes the dashboard section and other properties */}
                <DashboardLayout 
                    section={<SectionDashboard isDarkMode={DarkMode} language={language} />} // Passes dark mode and language to SectionDashboard
                    language={language} // Passes the current language to the layout
                    titleView={titleView} // Passes the title to the layout
                    subtitle={subtitle} // Passes the subtitle to the layout
                    isDarkMode={DarkMode} // Passes dark mode status to the layout
                />
            </main>
        </Route>
    );
}
