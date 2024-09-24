import "./inputFilterStyles.css"; // Import CSS styles for the component
import CheckIcon from '@mui/icons-material/Check'; // Import the check icon from Material UI
import DeleteIcon from '@mui/icons-material/Delete'; // Import the delete icon from Material UI (not used in the current code)

// Interface defining the expected props for the InputFilter component
interface InputFilterProps {
  label: string | undefined | null; // Label text for the checkbox
  name: string; // Name attribute for the checkbox input
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Change event handler
  checked: boolean; // Boolean indicating whether the checkbox is checked
  className?: string; // Optional additional class name for styling
}

// Functional component for rendering a filter input with a checkbox
export default function InputFilter({
  label,
  name,
  onChange,
  checked,
  className
}: InputFilterProps): React.ReactNode {
  return (
    <div className="content-filter"> {/* Container for the filter input */}
      <label
        htmlFor={name} // Associates the label with the checkbox via the input ID
        className={checked ? "checked-filter" : `unchecked_${className}`} // Class based on checked state
      >
        {/* Display the label with a flag emoji based on the language */}
        {label === "español" || label === "spanish" ? `${label} 🇪🇸` :
         label === "francés" || label === "french" ? `${label} 🇫🇷` :
         label === "inglés" || label === "english" ? `${label} 🇬🇧` : label}
        <input
          type="checkbox" // Checkbox input
          checked={checked} // Controlled checkbox state
          id={name} // ID for the checkbox
          name={name} // Name attribute for the checkbox
          onChange={onChange} // Change event handler
        />
        {checked && <CheckIcon className="checked-icon" />} {/* Show check icon if checked */}
      </label>
    </div>
  );
}
