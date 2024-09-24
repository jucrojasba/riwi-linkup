"use client"; // Indicate that this is a client component

import { ReactElement, useEffect, useState } from "react"; // Import necessary hooks and types from React
import { styled } from "@mui/material/styles"; // Import styled utility for custom styles

// Interface for the props of the IconWithHover component
interface IconWithHoverProps {
  icon: ReactElement; // The icon element to be rendered
  color: string; // Color of the icon
  hoverColor: string; // Color of the icon on hover
  onClick?: () => void; // Optional click event handler
  isDarkMode?: boolean; // Optional prop to indicate dark mode
}

// Styled component for the icon with hover effect
const StyledIcon = styled("div")<{
  color: string; // Color prop for styled component
  hoverColor: string; // Hover color prop for styled component
  fontSize: string; // Font size prop for styled component
}>(({ color, hoverColor, fontSize }) => ({
  display: "flex", // Use flexbox for alignment
  alignItems: "center", // Center items vertically
  justifyContent: "center", // Center items horizontally
  fontSize: fontSize, // Set font size from props
  color: color, // Set text color from props
  transition: "background-color 0.3s ease", // Smooth transition for background color
  "&:hover": {
    color: hoverColor, // Change color on hover
    cursor: "pointer", // Show pointer cursor on hover
  },
}));

// Functional component for icon with hover effect
const IconWithHover: React.FC<IconWithHoverProps> = ({
  icon, // Icon to display
  color, // Default color of the icon
  hoverColor, // Color of the icon when hovered
  onClick, // Click event handler
  isDarkMode, // Flag for dark mode
}) => {
  const [isHovered, setIsHovered] = useState(false); // State to track hover status
  const [fontSize, setFontSize] = useState("2.5rem"); // State for font size

  useEffect(() => {
    // Get the CSS variable value for the breakpoint
    const breakpoint = getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-md').trim();
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint})`);
    
    // Function to handle resizing
    const handleResize = () => {
      // Adjust font size based on media query
      setFontSize(mediaQuery.matches ? "1.8rem" : "2.5rem");
    };

    // Initialize the font size on mount
    handleResize();

    // Add event listener for media query changes
    mediaQuery.addEventListener('change', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []); // Run only on mount and unmount

  return (
    <StyledIcon
      color={isDarkMode ? 'white' : color} // Set color based on dark mode
      hoverColor={hoverColor} // Set hover color
      fontSize={fontSize} // Pass font size to styled component
      onMouseEnter={() => setIsHovered(true)} // Set hover state on mouse enter
      onMouseLeave={() => setIsHovered(false)} // Reset hover state on mouse leave
      onClick={onClick} // Assign click handler
    >
      {icon} 
    </StyledIcon>
  );
};

export default IconWithHover; // Export the component
