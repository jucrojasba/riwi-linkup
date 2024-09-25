"use client"; // Indicate that this is a client component

import { ButtonProps, IconButtonProps } from "@/UI/interfaces/Button"; // Import custom button properties
import { IconButton } from "@mui/material"; // Import Material-UI IconButton component
import { styled } from "@mui/material/styles"; // Import styled utility for custom styles
import GoogleIcon from '@mui/icons-material/Google'; // Import Google icon from Material-UI icons
import GitHubIcon from '@mui/icons-material/GitHub'; // Import GitHub icon from Material-UI icons

// Styled IconButton component with custom styles
const IconButtonStyle = styled(IconButton)(() => ({
  backgroundColor: "var(--secondary-color)", // Set background color from CSS variable
  borderRadius: "var(--border-radius-min)", // Set border radius from CSS variable
  textTransform: "none", // No text transformation
  fontFamily: "var(--main-font)", // Set font family from CSS variable
  minWidth: "fit-content", // Minimum width to fit content
  fontSize: "1rem", // Set font size
}));

// Functional component for the custom icon button
const CustomIconButton: React.FC<IconButtonProps> = ({
  icon, // Type of icon to display
  iconColor='var(--main-color)', // Default icon color
  backgroundColor='transparent', // Default background color
  onClick, // Click event handler
  className // Optional custom class for styling
}) => {
  return (
    <IconButtonStyle 
      className={className} // Pass custom class to styled component
      onClick={onClick} // Assign click handler
      sx={{
        width: '100px', // Set width of the button
        color: iconColor, // Set icon color
        backgroundColor: backgroundColor, // Set background color
        '&:hover': { // Styles for hover state
          backgroundColor: backgroundColor, // Maintain background color on hover
          color: iconColor, // Maintain icon color on hover
        },
      }}
    >
      {/* Conditional rendering of icons based on the 'icon' prop */}
      {icon === 'google' ? <GoogleIcon /> : icon === 'github' ? <GitHubIcon /> : ''}
    </IconButtonStyle>
  );
};

export default CustomIconButton; // Export the component
