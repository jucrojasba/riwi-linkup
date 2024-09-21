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

interface AuthenticatedMenuToggleProps {
    language: boolean;
}

const AuthenticatedMenuToggle: React.FC<AuthenticatedMenuToggleProps> = ({ language }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const options = [
        { text: language ? 'Tablero' : 'Dashboard', icon: <SpaceDashboardIcon />, href: '/dashboard' },
        { text: language ? 'Desarrolladores' : 'Coders', icon: <ComputerIcon />, href: '/admin' },
        { text: language ? 'Configuración' : 'Config', icon: <SettingsIcon />, href: '/config' },
        { text: language ? 'Mi Lista' : 'My List', icon: <ChecklistRtlIcon />, href: '/myList' },
    ];

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = async () => {
        clearLocalStorage();
        await signOut({ callbackUrl: "/login" });
    };

    return (
        <div style={{ height: '100%', minHeight: '95vh' }}>
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
                        {option.icon}
                        {option.text}
                    </MenuItem>
                ))}
                <MenuItem
                    onClick={handleSignOut}
                    sx={{ color: 'var(--white-color)' }} // Asegura el color del texto
                >
                    <LogoutIcon />
                    {language ? 'Cerrar Sesión' : 'Log Out'}
                </MenuItem>
                <LanguageSelector showBoxShadow={true} />
            </Menu>
        </div>
    );
};

export default AuthenticatedMenuToggle;

