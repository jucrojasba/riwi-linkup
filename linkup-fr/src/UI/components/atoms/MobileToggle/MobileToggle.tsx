import React from "react";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import useNavigate from "@/utilities/NavigateTo"; // Custom navigation utility
import LanguageSelector from "../SwitchLanguage/SwitchLanguage"; // Language switcher component

interface MobileToggleProps {
    language: boolean; // Prop to toggle language
}

const MobileToggle: React.FC<MobileToggleProps> = ({ language }) => {
    const navigate = useNavigate(); // Custom hook for navigation
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); // State for menu anchor
    const open = Boolean(anchorEl); // Boolean to check if menu is open

    // Navigation options based on language prop
    const options = [
        { text: language ? 'Inicio' : 'Home', href: '/' },
        { text: language ? 'Iniciar Sesión' : 'Log In', href: '/login' },
        { text: language ? 'Registrarse' : 'Register', href: '/register' },
        { text: language ? 'Contáctanos' : 'Contact Us', href: 'https://riwi.io/empleadores/#Contacto' },
        { text: language ? 'Acerca de' : 'About Us', href: 'https://riwi.io/empleadores/' },
    ];

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget); // Set anchor element to open menu
    };

    const handleClose = () => {
        setAnchorEl(null); // Close menu by resetting anchor element
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="toggle-button"
                aria-controls={open ? 'toggle-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick} // Handle click to open menu
                sx={{ color: 'var(--main-color)' }} // Custom color
            >
                <MenuIcon /> {/* Menu icon */}
            </IconButton>
            <Menu
                id="toggle-menu"
                MenuListProps={{
                    'aria-labelledby': 'toggle-button',
                }}
                anchorEl={anchorEl} // Attach menu to anchor element
                open={open} // Control menu visibility
                onClose={handleClose} // Close menu on outside click
                sx={{
                    '&::-webkit-scrollbar': {
                        width: '8px', // Custom scrollbar width
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'var(--main-color)', // Custom scrollbar thumb color
                        borderRadius: '10px', // Rounded corners for thumb
                    },
                    '&::-webkit-scrollbar-track': {
                        background: 'transparent', // Transparent scrollbar track
                    },
                    '& .MuiMenu-paper': {
                        backgroundColor: 'var(--main-color)', // Menu background color
                        color: 'var(--white-color)', // Menu text color
                    },
                }}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => { navigate(option.href); }} // Handle navigation on item click
                        sx={{ color: 'var(--white-color)' }} // Ensure menu item text color
                    >
                        {option.text} {/* Menu item text */}
                    </MenuItem>
                ))}
                <LanguageSelector showBoxShadow={true} /> {/* Language selector */}
            </Menu>
        </div>
    );
};

export default MobileToggle; // Export the MobileToggle component
