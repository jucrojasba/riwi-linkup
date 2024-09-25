"use client";

import React, { useState } from "react"; // Import necessary libraries
import { TextInputProps } from "@/UI/interfaces/Input"; // Import type definitions for props
import TextField from "@mui/material/TextField"; // Material-UI TextField component
import { styled } from "@mui/material/styles"; // Styling utility from Material-UI
import Visibility from "@mui/icons-material/Visibility"; // Icon for showing password
import VisibilityOff from "@mui/icons-material/VisibilityOff"; // Icon for hiding password
import { IconButton, InputAdornment } from "@mui/material"; // UI components for input adornments
import { useDarkMode } from "@/global-states/dark-mode"; // Custom hook for managing dark mode state

// Styled TextField component with specific styles applied
const PasswordInputStyle = styled(TextField)(() => ({
  textTransform: "none", // Disable text transformation
  fontFamily: "var(--main-font)", // Use a custom font family
  "& .MuiOutlinedInput-root": { // Styles for the outlined input root
    "& fieldset": {
      borderColor: "var(--main-color)", // Set border color
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--main-color)", // Set border color when focused
    },
  },
  "& .MuiInputLabel-outlined": {
    color: "var(--main-color)", // Set default label color
    backgroundColor: "transparent", // Remove background color from label
    borderColor: "transparent", // Remove border color from label
    cursor: "default", // Set cursor style for label
  },
  "& .MuiInputLabel-outlined.Mui-focused": {
    color: "var(--main-color)", // Set label color when focused
  },
  "& .MuiInputLabel-root.Mui-error": {
    color: "var(--red-color)", // Set label color in case of error
  },
  "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--main-color)", // Set border color on error
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: "var(--red-color)", // Set helper text color in case of error
  },
}));

// PasswordInput component definition
const PasswordInput: React.FC<TextInputProps> = ({
  type = "text", // Default input type
  name, // Input name
  defaultValue = "", // Default value for input
  error = false, // Error state
  required = false, // Required field indicator
  label, // Label for input
  helperText = "", // Helper text displayed below input
  onChange, // Change event handler
}) => {
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const DarkMode = useDarkMode((state) => state.DarkMode); // Retrieve dark mode state using custom hook

  // Function to toggle password visibility
  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState); // Toggle state
  };

  return (
    // Render the PasswordInputStyle component
    <PasswordInputStyle
      id="outlined-error-helper-text" // ID for accessibility
      name={name} // Input name
      type={type === "password" && !showPassword ? "password" : "text"} // Set type based on visibility state
      defaultValue={defaultValue} // Set default value
      label={label} // Set label
      error={error} // Set error state
      required={required} // Set required state
      helperText={helperText} // Set helper text
      size="small" // Set size of the input
      onChange={onChange} // Attach change event handler
      sx={{
        width: { xs: "100%", sm: "300px", md: "400px" }, // Responsive width based on breakpoints
        "& .MuiInputBase-input": DarkMode ? { color: "var(--white-color)" } : {}, // Set input text color based on dark mode
      }}
      InputProps={{
        endAdornment: type === "password" && ( // Add icon button for password visibility toggle
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility" // Accessibility label
              onClick={handleShowPassword} // Attach click event handler
              edge="end" // Position of the button
              sx={{ color: "var(--main-color)" }} // Button color
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput; // Export the PasswordInput component
