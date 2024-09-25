"use client"; // Indicates that this is a client-side component in Next.js

import { useDarkMode } from "@/global-states/dark-mode"; // Hook for managing dark mode state
import { useLanguage } from "@/global-states/language-mode"; // Hook for managing language state
import Route from "@/routes/route"; // Importing the Route component for navigation handling
import { DashboardLayout } from "@/UI/components/organisms"; // Importing the Dashboard layout component
import SectionMyList from "@/UI/components/organisms/SectionMyList/SectionMyList"; // Importing the SectionMyList component
import { useState } from "react"; // Importing useState from React to manage local state

// Define the MyList functional component
export default function MyList(): React.ReactNode {
    // Retrieve the current language state using the useLanguage hook
    const language = useLanguage((state) => state.language);
    // useState hook to manage a boolean state for rendering control
    const [render, setRender] = useState<boolean>(false);
    // Retrieve the current dark mode state using the useDarkMode hook
    const DarkMode = useDarkMode(state => state.DarkMode);
    
    return (
        <Route> {/* Wrapping the entire layout inside the Route component */}
            <DashboardLayout
                section={ // Inject the SectionMyList component inside the DashboardLayout
                    <SectionMyList 
                        render={render} // Prop to manage whether the section should be rendered
                        setRender={setRender} // Function to update the render state
                        isDarkMode={DarkMode} // Prop to apply dark mode settings to the section
                    />
                }
                language={language} // Pass the current language to the layout
                isDarkMode={DarkMode} // Apply the dark mode state to the layout
                titleView={language ? 'Mi Lista' : 'My List'} // Set the title dynamically based on the selected language
                subtitle={language ? 'Lista de desarrolladores seleccionados' : 'List of coders selected'} // Set the subtitle dynamically based on the selected language
            />
        </Route>
    );
}
