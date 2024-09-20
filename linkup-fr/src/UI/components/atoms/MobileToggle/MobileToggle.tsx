import React from "react";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import useNavigate from "@/utilities/NavigateTo";
import LanguageSelector from "../SwitchLanguage/SwitchLanguage";

interface MobileToggleProps {
    language: boolean;
}

const MobileToggle: React.FC<MobileToggleProps> = ({ language }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const options = [
        { text: language ? 'Inicio' : 'Home', href: '/' },
        { text: language ? 'Iniciar Sesión' : 'Log In', href: '/login' },
        { text: language ? 'Registrarse' : 'Register', href: '/register' },
        { text: language ? 'Contáctanos' : 'Contact Us', href: 'https://riwi.io/empleadores/#Contacto' },
        { text: language ? 'Acerca de' : 'About Us', href: 'https://riwi.io/empleadores/' },
    ];

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="toggle-button"
                aria-controls={open ? 'toggle-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                sx={{ color: 'var(--main-color)' }}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="toggle-menu"
                MenuListProps={{
                    'aria-labelledby': 'toggle-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'var(--main-color)',
                        borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: 'transparent',
                    },
                    '& .MuiMenu-paper': {
                        backgroundColor: 'var(--main-color)', // Color de fondo
                        color: 'var(--white-color)', // Color del texto
                    },
                }}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => { navigate(option.href); }}
                        sx={{ color: 'var(--white-color)' }} // Asegura el color del texto
                    >
                        {option.text}
                    </MenuItem>
                ))}
                <LanguageSelector showBoxShadow={true} />
            </Menu>
        </div>
    );
};

export default MobileToggle;
