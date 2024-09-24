'use client'; // Indicate this is a client-side component
import React, { useEffect, useState } from 'react'; // Import React and hooks
import IconWithHover from "@/UI/components/atoms/IconHover/IconHover"; // Import a hoverable icon component
import InstagramIcon from "@mui/icons-material/Instagram"; // Import Instagram icon from Material-UI
import WhatsAppIcon from "@mui/icons-material/WhatsApp"; // Import WhatsApp icon from Material-UI
import SwitchMode from "@/UI/components/atoms/SwitchDarkMode/SwitchDarkMode"; // Import dark mode switch
import './UtilityRightButtons.css'; // Import CSS styles for the component

// Define props interface for the component
interface IUtilityRightButtonsProps {
  isDarkMode?: boolean; // Optional prop to determine dark mode state
  responsive?: boolean; // Optional prop to indicate responsive behavior
  hideMediaIcons?: boolean; // Optional prop to hide media icons
}

// Functional component definition
const UtilityRightButtons: React.FC<IUtilityRightButtonsProps> = ({ isDarkMode, responsive, hideMediaIcons }) => {
  const [isBelowMediumScreen, setIsBelowMediumScreen] = useState(false); // State to track screen size

  useEffect(() => {
    if (responsive) {
      // Get the breakpoint from CSS variable
      const breakpoint = getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-md').trim();
      const mediaQuery = window.matchMedia(`(max-width: ${breakpoint})`); // Create a media query

      // Function to handle screen resize
      const handleResize = () => setIsBelowMediumScreen(mediaQuery.matches);
      handleResize(); // Initialize the state
      mediaQuery.addEventListener('change', handleResize); // Add listener for changes

      return () => {
        mediaQuery.removeEventListener('change', handleResize); // Cleanup listener on unmount
      };
    }
  }, [responsive]); // Run effect if 'responsive' prop changes

  // If responsive and screen is above breakpoint, return null
  if (responsive && !isBelowMediumScreen) {
    return null;
  }

  return (
    <div className="utility-right-buttons">
      {/* Conditionally render media icons based on props */}
      {!hideMediaIcons && (
        <div className={responsive ? "media-icons-responsive" : "media-icons"}>
          {/* Instagram icon with hover effect */}
          <IconWithHover
            icon={<InstagramIcon fontSize="inherit" />}
            color="var(--paragraph-color)"
            hoverColor="#FF00FF"
            onClick={() => { window.open('https://www.instagram.com/riwi.io/?hl=en') }} // Open Instagram link
            isDarkMode={isDarkMode}
          />
          {/* WhatsApp icon with hover effect */}
          <IconWithHover
            icon={<WhatsAppIcon fontSize="inherit" />}
            color="var(--paragraph-color)"
            hoverColor="#25D366"
            onClick={() => { window.open('https://wa.link/tptm6j') }} // Open WhatsApp link
            isDarkMode={isDarkMode}
          />
        </div>
      )}
      {/* Dark mode switch */}
      <div className={responsive ? "switch-mode-home-responsive" : "switch-mode-home"}>
        <SwitchMode onClick={() => { }} /> {/* Placeholder for click handler */}
      </div>
    </div>
  );
};

export default UtilityRightButtons; // Export the component
