import "./headerStyles.css"; // Import the CSS styles for the header
import React, { useState, useEffect } from "react"; // Import React and hooks
import TitleMain from "../../atoms/TitleMain/TitleMain"; // Import TitleMain component for title display
import Search from "../Search/Search"; // Import Search component for search functionality
import Sidebar from "../Sidebar/Sidebar"; // Import Sidebar component for navigation
import SwitchMode from "../../atoms/SwitchDarkMode/SwitchDarkMode"; // Import SwitchMode for dark mode toggle
import SelectLanguage from "../../atoms/SwitchLanguage/SwitchLanguage"; // Import SelectLanguage for language selection
import AuthenticatedMenuToggle from "../AuthenticatedMenuToggle/AuthenticatedMenuToggle"; // Import menu for authenticated users

// Define the interface for header props
interface IHeaderProps {
  expand: boolean; // Prop to determine if the sidebar is expanded
  titleView: string; // Main title to display in the header
  subtitle: string; // Subtitle to display under the main title
  path: string; // Path for the current view (not used in this code)
  language: boolean; // Language state to determine which language to display
}

// Header component definition
export default function Header({ expand, titleView, subtitle, path, language }: IHeaderProps): React.ReactNode {
  const [isMobile, setIsMobile] = useState(false); // State to track if the view is on mobile

  useEffect(() => {
    // Get the CSS variable value for the breakpoint
    const breakpoint = getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-md').trim();
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint})`); // Create media query based on the breakpoint

    // Handle changes in the media query match
    const handleResize = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches); // Update mobile state based on the media query match
    };
    
    // Set initial mobile state
    setIsMobile(mediaQuery.matches);
    
    // Add event listener for media query changes
    mediaQuery.addEventListener("change", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []); // Run effect once on mount

  const handlerClick = () => {
    // Placeholder for a click handler (currently does nothing)
  };

  return (
    <header className={isMobile ? "header-mobile" : "header"}> {/* Conditional class based on mobile state */}
      {isMobile && <AuthenticatedMenuToggle language={language} />} {/* Render menu toggle for mobile view */}
      {!isMobile && <Sidebar isExpanded={expand} language={language} />} {/* Render sidebar for desktop view */}
      <div className={isMobile ? "section-content-coders-mobile" : "section-content-coders"}>
        <TitleMain
          className="content-coders-title" // Class for title styling
          title={titleView} // Main title prop
          subtitle={subtitle} // Subtitle prop
        />
        {!isMobile && <SelectLanguage />} {/* Render language selection only on desktop */}
        <Search /> {/* Always render search component */}
        {!isMobile && <SwitchMode onClick={handlerClick} horizontalMode={true} />} {/* Render dark mode toggle only on desktop */}
      </div>
    </header>
  );
}
