import "./dashboardLayoutStyles.css"; // Import styles for the layout
import React, { ReactElement, useState, useEffect } from "react"; // Import React and hooks
import { Footer, Header, UtilityRightButtons } from "../../molecules"; // Import child components
import { usePathname } from "next/navigation"; // Hook to get the current pathname
import { useExpand } from "@/global-states/expandSideBar"; // Hook for managing sidebar expansion state

// Define the props interface for the DashboardLayout component
interface IDashboardLayoutProps {
  section: ReactElement; // The main content section to display
  titleView: string; // Title for the header
  subtitle: string; // Subtitle for the header
  language: any; // Language state
  isDarkMode?: boolean; // Optional dark mode state
}

// Main functional component for the dashboard layout
export default function DashboardLayout({
  section,
  titleView,
  subtitle,
  language,
  isDarkMode,
}: IDashboardLayoutProps): React.ReactElement {
  const expand = useExpand((state) => state.expand); // Get the sidebar expansion state
  const pathname = usePathname(); // Get the current path
  const [isSmallScreen, setIsSmallScreen] = useState(false); // State to manage screen size

  // Effect to handle screen resizing
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 794); // Check if the screen is small

    // Execute on initial render
    handleResize();

    window.addEventListener("resize", handleResize); // Add event listener for resizing
    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
  }, []);

  return (
    <div className={isDarkMode ? 'content-layout-dark-mode' : "content-layout"}>
      <div className="content-dashboard">
        <Header
          expand={expand} // Pass sidebar expansion state to Header
          titleView={titleView} // Title prop for Header
          subtitle={subtitle} // Subtitle prop for Header
          path={pathname} // Current path for Header
          language={language} // Language state for Header
        />
        <main className={isSmallScreen ? "mainGeneralCollapsed" : expand ? "mainGeneralCollapsed" : "mainGeneral"}>
          {section} {/* Render the main content section */}
        </main>
        <Footer isDarkMode={isDarkMode} /> {/* Render Footer with dark mode state */}
      </div>
      <UtilityRightButtons responsive={true} hideMediaIcons={true} isDarkMode={isDarkMode} /> 
      {/* Render UtilityRightButtons component */}
    </div>
  );
}
