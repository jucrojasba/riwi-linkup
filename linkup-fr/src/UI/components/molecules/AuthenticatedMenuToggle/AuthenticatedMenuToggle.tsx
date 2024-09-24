import React from "react";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import useNavigate from "@/utilities/NavigateTo";
import LanguageSelector from "../../atoms/SwitchLanguage/SwitchLanguage";
import SettingsIcon from "@mui/icons-material/Settings";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ComputerIcon from "@mui/icons-material/Computer";
import LogoutIcon from "@mui/icons-material/Logout";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import { clearLocalStorage } from "@/utilities/LocalStorage";
import { signOut } from "next-auth/react";

// Define the props for the AuthenticatedMenuToggle component
interface AuthenticatedMenuToggleProps {
    language: boolean; // Language toggle for displaying text in either English or Spanish
}

// Functional component for the authenticated menu toggle
const AuthenticatedMenuToggle: React.FC<AuthenticatedMenuToggleProps> = ({ language }) => {
    const navigate = useNavigate(); // Custom hook to navigate between routes
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); // State to control menu visibility
    const open = Boolean(anchorEl); // Determine if the menu is open based on anchorEl state

    // Options for the menu items with corresponding text and icons
    const options = [
        { text: language ? 'Tablero' : 'Dashboard', icon: <SpaceDashboardIcon aria-hidden="true" />, href: '/dashboard' },
        { text: language ? 'Desarrolladores' : 'Coders', icon: <ComputerIcon aria-hidden="true" />, href: '/admin' },
        { text: language ? 'Configuración' : 'Config', icon: <SettingsIcon aria-hidden="true" />, href: '/config' },
        { text: language ? 'Mi Lista' : 'My List', icon: <ChecklistRtlIcon aria-hidden="true" />, href: '/myList' },
    ];

    // Handle the click event to open the menu
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget); // Set the anchor element for the menu
    };

    // Handle closing the menu
    const handleClose = () => {
        setAnchorEl(null); // Reset anchor element to close the menu
    };

    // Handle user sign-out
    const handleSignOut = async () => {
        try {
            clearLocalStorage(); // Clear local storage upon sign out
            await signOut({ callbackUrl: "/login" }); // Sign out user and redirect to login
        } catch (error) {
            console.error("Error signing out:", error); // Log any error during sign out
            // Optionally show an alert here to notify the user
        }
    };

    return (
        <div style={{ height: '100%', minHeight: '95vh' }}> {/* Container for the menu toggle */}
            <IconButton
                aria-label="menu" // Accessibility label for the button
                id="toggle-button" // Unique ID for the button
                aria-controls={open ? 'toggle-menu' : undefined} // Controls attribute for accessibility
                aria-expanded={open ? 'true' : undefined} // Indicate if the menu is expanded
                aria-haspopup="true" // Indicate the presence of a popup menu
                onClick={handleClick} // Click event to open the menu
                sx={{ color: 'var(--main-color)' }} // Custom styles for the button
            >
                <MenuIcon /> {/* Icon for the menu button */}
            </IconButton>
            <Menu
                id="toggle-menu" // Unique ID for the menu
                MenuListProps={{
                    'aria-labelledby': 'toggle-button', // Associate menu list with the toggle button
                }}
                anchorEl={anchorEl} // Anchor element to position the menu
                open={open} // Control menu visibility
                onClose={handleClose} // Close event handler
                sx={{
                    '&::-webkit-scrollbar': {
                        width: '8px', // Custom scrollbar width
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'var(--main-color)', // Color of the scrollbar thumb
                        borderRadius: '10px', // Round corners for the scrollbar thumb
                    },
                    '&::-webkit-scrollbar-track': {
                        background: 'transparent', // Transparent scrollbar track
                    },
                    '& .MuiMenu-paper': {
                        backgroundColor: 'var(--main-color)', // Background color for the menu
                        color: 'var(--white-color)', // Text color for the menu
                    },
                }}
            >
                {/* Map through the options to create menu items */}
                {options.map((option, index) => (
                    <MenuItem
                        key={index} // Unique key for each menu item
                        onClick={() => { navigate(option.href); handleClose(); }} // Navigate and close the menu on item click
                        sx={{ color: 'var(--white-color)' }} // Text color for the menu item
                    >
                        {option.icon} {/* Render the icon for the menu item */}
                        {option.text} {/* Render the text for the menu item */}
                    </MenuItem>
                ))}
                <MenuItem
                    onClick={() => { handleSignOut(); handleClose(); }} // Handle sign out and close the menu
                    sx={{ color: 'var(--white-color)' }} // Text color for the sign-out menu item
                >
                    <LogoutIcon aria-hidden="true" /> {/* Icon for sign-out */}
                    {language ? 'Cerrar Sesión' : 'Log Out'} {/* Text for sign-out based on language */}
                </MenuItem>
                <LanguageSelector showBoxShadow={true} /> {/* Language selector component */}
            </Menu>
        </div>
    );
};

export default AuthenticatedMenuToggle; // Export the component for use in other parts of the application
