'use client'; // Indicates this component uses client-side rendering

import { ButtonProps } from '@/UI/interfaces/Button'; // Importing the ButtonProps interface for type safety
import Button from '@mui/material/Button'; // Importing the Button component from Material-UI
import { styled } from '@mui/material/styles'; // Importing the styled utility for creating custom styles

// Styled component definition for the SecondaryButton
const SecondaryButtonStyle = styled(Button)(() => ({
  backgroundColor: "transparent", // Set background color to transparent
  color: "var(--main-color)", // Use the main color variable for text color
  borderColor: "var(--main-color)", // Set border color to the main color variable
  borderRadius: "5px", // Set border radius for rounded corners
  textTransform: "none", // Prevent automatic text transformation (e.g., uppercase)
  fontFamily: "var(--main-font)", // Use the main font variable for typography
  minWidth: "fit-content", // Set minimum width to fit the content
}));

// SecondaryButton functional component definition
const SecondaryButton: React.FC<ButtonProps> = ({
  type = 'button', // Default type for the button
  text, // Button text passed as a prop
  onClick, // Click event handler passed as a prop
}) => {
  return (
    <SecondaryButtonStyle type={type} variant="outlined" onClick={onClick}>
      {text} {/* Render the button text */}
    </SecondaryButtonStyle>
  );
};

// Exporting the SecondaryButton component for use in other parts of the application
export default SecondaryButton;
