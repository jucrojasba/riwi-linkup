'use client'; // Indicates that this component is a client component in Next.js

import { TextInputProps } from '@/UI/interfaces/Input'; // Importing the interface for props
import { useDarkMode } from '@/global-states/dark-mode'; // Importing custom hook for dark mode
import TextField from '@mui/material/TextField'; // Importing TextField component from MUI
import { styled } from '@mui/material/styles'; // Importing styled utility from MUI
import { useId } from 'react'; // Importing useId hook for generating unique IDs

// Styled TextField component with custom styles
const TextInputStyle = styled(TextField)(() => ({
    width: '100%', // Full width for the input
    textTransform: 'none', // Prevent text transformation
    fontFamily: 'var(--main-font)', // Custom font from CSS variables
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'var(--main-color)', // Set border color
        },
        '&.Mui-focused fieldset': {
            borderColor: 'var(--main-color)', // Change border color on focus
        },
    },
    '& .MuiInputLabel-outlined': {
        color: 'var(--main-color)', // Set label color
        backgroundColor: 'transparent', // Make background transparent
        borderColor: 'transparent', // Make border transparent
        cursor: 'default', // Default cursor for label
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
        color: 'var(--main-color)', // Change label color on focus
    },
    "& .MuiInputLabel-root.Mui-error": {
        color: "var(--red-color)", // Error label color
    },
    "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
        borderColor: "var(--main-color)", // Error border color
    },
    "& .MuiFormHelperText-root.Mui-error": {
        color: "var(--red-color)", // Error helper text color
    },
}));

// Main TextInput functional component
const TextInput: React.FC<TextInputProps> = ({ 
    type = 'text', 
    name, 
    defaultValue = '', 
    error = false, 
    required = false, 
    label, 
    helperText = '', 
    onChange,
}) => {
    const DarkMode = useDarkMode((state) => state.DarkMode); // Using the dark mode state
    const generatedId = useId(); // Generating a unique ID for the input field

    return (
        <>
            {/* Render the TextInputStyle with appropriate props based on DarkMode */}
            <TextInputStyle 
                id={generatedId} // Setting the generated ID
                type={type} // Setting the input type
                name={name} // Setting the name
                defaultValue={defaultValue} // Setting the default value
                label={label} // Setting the label
                error={error} // Setting the error state
                required={required} // Setting the required attribute
                helperText={helperText} // Setting the helper text
                size='small' // Setting the size of the input
                onChange={onChange} // Handling change event
                sx={{
                    width: { xs: '100%', sm: '300px', md: '400px' }, // Responsive width
                    // Apply text color if in Dark Mode
                    ...(DarkMode && { 
                        '& .MuiInputBase-input': { color: 'var(--white-color)' } 
                    }),
                }}
            />
        </>
    );
};

export default TextInput; // Exporting the TextInput component
