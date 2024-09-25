"use client";

import { ButtonProps } from "@/UI/interfaces/Button"; // Import button properties
import Button from "@mui/material/Button"; // Import Button component from Material-UI
import { styled } from "@mui/material/styles"; // Import styled function for custom styles
import React, { useState } from "react"; // Import useState hook from React

// Define additional properties for the custom button
interface CustomButtonProps extends ButtonProps {
  initialText: string | React.ReactElement; // Initial text of the button
  clickedText: string | React.ReactElement; // Text displayed when clicked
  initialBgColor: string; // Initial background color
  clickedBgColor: string; // Background color after being clicked
  secondOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Optional function for second click
}

// Create a styled button component
const CustomButtonStyle = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'bgColor', // Prevent bgColor from being passed to the DOM
})<{ bgColor?: string }>(({ bgColor }) => ({
  backgroundColor: bgColor || "var(--main-color)", // Background color of the button
  borderRadius: "80px", // Rounded corners
  textTransform: "none", // No text transformation
  textAlign: "center", // Center alignment
  fontFamily: "var(--main-font)", // Font family for the text
  fontSize: "1rem", // Font size
  width: "fit-content", // Width adjusts to content
  display: "flex", // Use flexbox for layout
  alignItems: "center", // Vertically center items
  justifyContent: "center", // Horizontally center items
  padding: "0.1rem 0.6rem", // Padding of the button
  gap: "0.5rem", // Space between items inside the button
  boxShadow: "none", // No shadow
  color: 'var(--white-color)', // Text color
  "&:hover": { // Styles when hovered
    filter: "brightness(0.95)", // Change brightness on hover
    boxShadow: "none", // No shadow on hover
  },
}));

// Functional component for the custom button
const CustomButton: React.FC<CustomButtonProps> = ({
  initialText,
  clickedText,
  onClick,
  secondOnClick,
  initialBgColor,
  clickedBgColor,
  type = "button", // Default button type
}) => {
  const [isClicked, setIsClicked] = useState(false); // State to manage button click status

  // Handle clicks on the button
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isClicked) {
      onClick?.(event); // Call onClick function if not clicked
      setIsClicked(true); // Change state to clicked
    } else {
      secondOnClick?.(event); // Call secondOnClick function if already clicked
      setIsClicked(false); // Change state to not clicked
    }
  };

  return (
    <CustomButtonStyle
      type={type} // Button type
      variant="contained" // Button style variant
      onClick={handleClick} // Handle button click
      bgColor={isClicked ? clickedBgColor : initialBgColor} // Change background color based on state
      aria-pressed={isClicked} // Add accessibility attribute
    >
      {isClicked ? clickedText : initialText}
    </CustomButtonStyle>
  );
};

export default CustomButton; // Export the component
