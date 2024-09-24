import * as React from 'react'; // Importing React library for building components
import InputLabel from '@mui/material/InputLabel'; // Importing InputLabel component from Material-UI
import MenuItem from '@mui/material/MenuItem'; // Importing MenuItem component from Material-UI for dropdown options
import FormControl from '@mui/material/FormControl'; // Importing FormControl for wrapping form elements
import Select, { SelectChangeEvent } from '@mui/material/Select'; // Importing Select component and SelectChangeEvent type

// Interface for the props that the SelectOptions component will receive
interface ISelectProps {
    label?: string; // Optional label for the select input
    values: string[]; // Array of values to display in the dropdown
    onChange?: (e: SelectChangeEvent) => void; // Optional change event handler for when the value changes
    value: string; // Current selected value
    name: string; // Name attribute for the select input
}

// Functional component for rendering a select dropdown
export default function SelectOptions({ label, values, onChange, value, name }: ISelectProps) {
    return (
        <FormControl sx={{ width: '100%' }} size="small" variant="outlined"> {/* Form control wrapper for the select */}
            <InputLabel id="select-options">{label}</InputLabel> {/* Label for the select input */}
            <Select
                labelId="select-options" // ID for the label
                id="select-option" // ID for the select component
                value={value} // Current selected value
                label={label} // Passing the label for accessibility
                onChange={onChange} // Event handler for value change
                name={name} // Name attribute for the select
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: '1px solid var(--main-color)', // Custom border style for the select
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: '1px solid var(--main-color)', // Custom border style when focused
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        border: '1px solid var(--main-color)', // Custom border style on hover
                    },
                }}
            >
                <MenuItem value=""> {/* Default option when no value is selected */}
                    <em>None</em>
                </MenuItem>
                {values.map((val, index) => ( // Mapping through values to create MenuItems
                    <MenuItem key={index} value={val}> {/* Each option in the dropdown */}
                        {val}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
