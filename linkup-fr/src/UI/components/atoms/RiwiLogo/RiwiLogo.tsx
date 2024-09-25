'use client'; // Indicates this component uses client-side rendering
import Image from "next/image"; // Import Next.js Image component for optimized image loading
import "./RiwiLogo.css"; // Import CSS for styling the logo
import { useEffect, useState } from "react"; // Import React hooks

// Interface defining the props for RiwiLogo component
interface IRiwiLogoProps {
  isDarkMode: boolean; // Prop to determine if dark mode is enabled
  responsive?: boolean; // Optional prop for responsive behavior
}

// RiwiLogo functional component definition
export default function RiwiLogo({
  isDarkMode, // Destructure isDarkMode from props
  responsive, // Destructure responsive from props
}: IRiwiLogoProps): React.ReactNode {
  const [isBelowMediumScreen, setIsBelowMediumScreen] = useState(false); // State to track if screen is below medium breakpoint

  // Effect to handle responsive behavior based on screen size
  useEffect(() => {
    if (responsive) {
      // Get the medium breakpoint defined in CSS variables
      const breakpoint = getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-md').trim();
      const mediaQuery = window.matchMedia(`(max-width: ${breakpoint})`); // Create a media query

      // Function to handle screen resize and update state
      const handleResize = () => setIsBelowMediumScreen(mediaQuery.matches);

      handleResize(); // Initialize the state based on the current screen size
      mediaQuery.addEventListener('change', handleResize); // Add event listener for screen size changes

      // Cleanup function to remove the event listener on component unmount
      return () => {
        mediaQuery.removeEventListener('change', handleResize);
      };
    }
  }, [responsive]); // Effect runs when responsive prop changes

  // If responsive and screen is not below the breakpoint, do not render the logo
  if (responsive && !isBelowMediumScreen) {
    return null; // Prevent rendering if conditions are not met
  }

  // Render the logo
  return (
    <div className="riwi-logo-container"> {/* Container for logo */}
      <Image
        className="nav-logo" // CSS class for styling the logo
        src={isDarkMode ? "/icons/logoRiwiPurple.svg" : "/icons/logoRiwi.svg"} // Determine logo source based on dark mode
        alt="Riwi" // Alternative text for the image
        width={90} // Width of the image
        height={40} // Height of the image
      />
    </div>
  );
}
