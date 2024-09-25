import { useExpand } from "@/global-states/expandSideBar"; // Import hook for sidebar expansion state
import "./footerStyles.css"; // Import CSS styles for the footer
import Link from "next/link"; // Import Link component for navigation
import { useState, useEffect } from "react"; // Import hooks from React

// Define the interface for the footer props
interface IFooter {
  isDarkMode: boolean | undefined; // Prop to determine if dark mode is active
}

// Footer component
export default function Footer({ isDarkMode }: IFooter): React.ReactNode {
  const expand = useExpand((state) => state.expand); // Get the sidebar expansion state
  const [shouldRender, setShouldRender] = useState(true); // State to control footer rendering

  // Effect to handle window resizing
  useEffect(() => {
    const breakpointMd = 794; // Define the breakpoint value in pixels
    const handleResize = () => setShouldRender(window.innerWidth >= breakpointMd); // Check if the window width is greater than or equal to the breakpoint

    handleResize(); // Verify the current size on initialization

    // Add resize event listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize); // Clean up the event listener on unmount
  }, []);

  // If the window width is less than the breakpoint, do not render the footer
  if (!shouldRender) return null;

  return (
    <footer className={`${expand ? 'footer-colapsed' : 'footer'}`}> {/* Apply different classes based on sidebar state */}
      {/* Navigation links with dynamic class names for dark mode */}
      <Link href="#" className={`link ${isDarkMode ? 'dark-link' : ''}`}>
        Riwi
      </Link>
      <Link href="#" className={`link ${isDarkMode ? 'dark-link' : ''}`}>
        Terms
      </Link>
      <Link href="#" className={`link ${isDarkMode ? 'dark-link' : ''}`}>
        Privacy
      </Link>
      <Link href="#" className={`link ${isDarkMode ? 'dark-link' : ''}`}>
        Docs
      </Link>
    </footer>
  );
}
