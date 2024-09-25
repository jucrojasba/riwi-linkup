'use client';

import { ButtonProps } from "@/UI/interfaces/Button"; // Importing ButtonProps interface for type checking
import Button from "@mui/material/Button"; // Importing Material-UI Button component
import { styled } from "@mui/material/styles"; // Importing styled utility from Material-UI
import "./mainButtonStyles.css"; // Importing CSS styles for the button

// Extending ButtonProps to include custom background color
interface MainButtonProps extends ButtonProps {
  bgColor?: string; // Optional custom background color prop
}

// Styled Button component with custom styles
const MainButtonStyle = styled(Button)<{ customBgColor?: string }>(({ customBgColor }) => ({
  backgroundColor: customBgColor || 'var(--main-color)', // Default to main color if no custom color is provided
  borderRadius: 'var(--border-radius-min)', // Border radius from CSS variable
  textTransform: 'none', // No text transformation
  fontFamily: 'var(--main-font)', // Font family from CSS variable
  minWidth: 'fit-content', // Minimum width for the button
  fontSize: '1rem', // Font size
  display: 'flex', // Use flexbox for layout
  alignItems: 'center', // Center items vertically
  gap: '0.5rem', // Space between icon and text
  width: '100%', // Full width
}));

// MainButton functional component
const MainButton: React.FC<MainButtonProps> = ({
  icon,
  text,
  onClick,
  type = "button", // Default button type
  className,
  bgColor, // Custom background color prop
  ...rest // Rest of the props
}) => {
  return (
    <MainButtonStyle
      type={type} // Button type
      variant="contained" // Material-UI variant
      onClick={onClick} // Click event handler
      className={className} // Optional custom class name
      sx={{ backgroundColor: bgColor }} // Override background color using sx
      {...rest} // Spread the rest of the props
    >
      {icon} {/* Icon to display */}
      {text} {/* Text to display */}
    </MainButtonStyle>
  );
};

export default MainButton; // Exporting MainButton component
