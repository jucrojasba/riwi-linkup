import { useState } from "react"; // Importing useState hook from React
import Button from "@mui/material/Button"; // Importing Button component from Material-UI
import Menu from "@mui/material/Menu"; // Importing Menu component from Material-UI
import MenuItem from "@mui/material/MenuItem"; // Importing MenuItem component from Material-UI
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // Importing dropdown arrow icon
import TranslateIcon from "@mui/icons-material/Translate"; // Importing translate icon
import { useLanguage } from "@/global-states/language-mode"; // Importing custom hook for language state

// Props interface for the LanguageSelector component
interface LanguageSelectorProps {
  showBoxShadow?: boolean; // Optional prop to show box shadow on button
}

// Main LanguageSelector functional component
const LanguageSelector: React.FC<LanguageSelectorProps> = ({ showBoxShadow = false }) => {
  // State to manage the anchor element for the dropdown menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { language, setLanguage } = useLanguage(); // Using the custom hook for language management

  // Function to handle button click and open the dropdown menu
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget); // Set the anchor element to the button clicked
  };

  // Function to close the dropdown menu
  const handleClose = () => {
    setAnchorEl(null); // Reset anchor element to null
  };

  // Function to handle language selection from the menu
  const handleMenuItemClick = (language: boolean) => {
    setLanguage(language); // Set the selected language
    setAnchorEl(null); // Close the menu after selection
  };

  return (
    <>
      <Button
        variant="contained" // Button variant
        color="primary" // Button color
        onClick={handleClick} // Click event handler
        endIcon={<ArrowDropDownIcon />} // Dropdown arrow icon at the end
        startIcon={<TranslateIcon />} // Translate icon at the start
        style={{
          textTransform: "none", // Prevent default text transformation
          backgroundColor: "var(--main-color)", // Background color from CSS variable
          color: "var(--white-color)", // Text color from CSS variable
          padding: "6px 16px", // Padding for the button
          borderRadius: "var(--border-radius-min)", // Border radius from CSS variable
          boxShadow: showBoxShadow ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none", // Conditional box shadow
          transition: "background-color 0.3s ease", // Transition effect for background color
        }}
        sx={{
          "&:hover": {
            backgroundColor: "var(--main-color)", // Same background color on hover
            color: "var(--white-color)", // Same text color on hover
            boxShadow: showBoxShadow ? "none" : "none", // Box shadow remains the same on hover
          },
        }}
      >
        {language ? "Español" : "English"} {/* Display current language */}
      </Button>

      {/* Dropdown menu for language selection */}
      <Menu
        anchorEl={anchorEl} // Anchor element for the menu
        open={Boolean(anchorEl)} // Menu open state based on anchor element
        onClose={handleClose} // Event handler to close the menu
        disablePortal // Prevents rendering in a portal
      >
        {/* Menu item for English language */}
        <MenuItem onClick={() => handleMenuItemClick(false)}>
          <img src="./icons/usaflag.jpg" alt="USA Flag" style={{ width: "20px", marginRight: "8px" }} />
          English
        </MenuItem>
        {/* Menu item for Spanish language */}
        <MenuItem onClick={() => handleMenuItemClick(true)}>
          <img src="./icons/colflag.png" alt="Colombia Flag" style={{ width: "20px", marginRight: "8px" }} />
          Español
        </MenuItem>
      </Menu>
    </>
  );
};

export default LanguageSelector; // Exporting the LanguageSelector component
