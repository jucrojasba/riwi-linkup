'use client';

import { TextInputProps } from '@/UI/interfaces/Input'; // Import custom text input properties
import TextField from '@mui/material/TextField'; // Import Material-UI TextField component
import { styled } from '@mui/material/styles'; // Import styled utility for custom styles
import { ChangeEvent, useState, useEffect } from 'react'; // Import React hooks

// Define the props for the EditField component, extending TextInputProps
interface EditFieldProps extends TextInputProps {
    edit?: boolean; // Optional prop to determine if the field is editable
    save?: boolean; // Optional prop to indicate if saving is allowed
    onSave?: (value: string) => void; // Callback function for saving the value
    DarkMode: boolean; // Prop to handle dark mode styling
    defaultValue: string; // Default value for the input field
}

// Styled TextField component with dynamic styles based on the 'edit' prop
const EditFieldStyle = styled(TextField)<{ edit?: string }>(({ theme, edit }) => ({
    width: '100%', // Set the width to 100%
    textTransform: 'none', // No text transformation
    fontFamily: 'var(--main-font)', // Set font family from CSS variable
    '& .MuiOutlinedInput-root': { // Styles for the input field
        '& fieldset': {
            borderColor: edit === 'true' ? 'var(--main-color)' : 'transparent', // Border color based on edit state
            borderWidth: edit === 'true' ? '2px' : '1px', // Border width based on edit state
        },
        '&.Mui-focused fieldset': { // Styles for focused state
            borderColor: edit === 'true' ? 'var(--main-color)' : 'transparent',
            borderWidth: edit === 'true' ? '2px' : '1px',
        },
    },
    '& .MuiInputLabel-outlined': { // Hide the label for outlined variant
        display: 'none',
    },
    '& .MuiInputLabel-outlined.Mui-focused': { // Hide focused label
        display: 'none',
    },
    '& .MuiInputLabel-root.Mui-error': { // Error label color
        color: 'var(--red-color)',
    },
    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': { // Error border color
        borderColor: 'var(--main-color)',
    },
    '& .MuiFormHelperText-root.Mui-error': { // Error helper text color
        color: 'var(--red-color)',
    },
    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': { // Disabled border color
        borderColor: 'transparent',
    },
    '& .MuiInputBase-input.Mui-disabled': { // Disable text color for disabled input
        WebkitTextFillColor: 'inherit',
    },
}));

// Functional component for the editable input field
const EditField: React.FC<EditFieldProps> = ({ 
    type = 'text', // Default type is 'text'
    name, // Input name
    defaultValue, // Default input value
    error = false, // Error state
    required = false, // Required state
    helperText = '', // Helper text
    onChange, // Change handler
    edit = false, // Editable state
    save = false, // Save state
    onSave, // Save callback
    DarkMode, // Dark mode flag
}) => {
    const [inputValue, setInputValue] = useState(defaultValue); // State for input value
    const [inputError, setInputError] = useState(false); // State for input error

    // Effect to reset error state when not in edit mode
    useEffect(() => {
        if (!edit) {
            setInputError(false);
        }
    }, [edit]);

    // Handle change events for the input field
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value); // Update input value state
        onChange?.(event); // Call optional onChange handler
    };

    // Handle blur events (when input loses focus)
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (save && onSave) {
            const value = event.target.value; // Get current value
            let isValid = true; // Initialize validity flag

            // Validate email format
            if (name === 'email') {
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            } 
            // Validate numeric format
            else if (name === 'number') {
                isValid = /^[0-9]+$/.test(value);
            }

            // Update error state based on validation
            if (!isValid) {
                setInputError(true);
                setInputValue(defaultValue); // Reset to default value if invalid
            } else {
                setInputError(false);
                onSave(value); // Call onSave with valid value
            }
        }
    };

    return (
        <EditFieldStyle
            edit={edit ? 'true' : 'false'} // Pass edit state as string
            id='outlined-error-helper-text' // Unique ID for the input field
            type={type} // Input type
            name={name} // Input name
            value={inputValue} // Controlled input value
            error={inputError} // Pass error state to the field
            required={required} // Pass required state to the field
            helperText={inputError ? 'Invalid value' : helperText} // Conditional helper text
            size='small' // Small size for the input
            onChange={handleChange} // Change event handler
            onBlur={handleBlur} // Blur event handler
            disabled={!edit} // Disable input when not in edit mode
            sx={{ 
                width: '250px', // Fixed width for the input field
                '& .MuiInputBase-input': {
                    color: DarkMode ? 'var(--white-color)' : 'var(--paragraph-color-gray)', // Text color based on dark mode
                    backgroundColor: 'transparent', // Transparent background
                    WebkitTextFillColor: DarkMode ? 'var(--white-color)' : 'var(--paragraph-color-gray)', // Text fill color
                },
            }}
        />
    );
};

export default EditField; // Export the component
