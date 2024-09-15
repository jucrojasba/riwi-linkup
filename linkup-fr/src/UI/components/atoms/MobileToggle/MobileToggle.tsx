import React from "react";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import useNavigate from "@/utilities/NavigateTo";



const options = [
    {text:'Home',href:'/'},
    {text:'Log In',href:'/login'},
    {text:'Register',href:'/register'},
    {text:'Contact Us',href:'https://riwi.io/empleadores/#Contacto'},
    {text:'About Us',href:'https://riwi.io/empleadores/'},
];

const MobileToggle:React.FC=()=>{

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <div>
            <IconButton
                aria-label="more"
                id="toggle-button"
                aria-controls={open ? 'toggle-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                sx={{color:'var(--main-color)'}}
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
                slotProps={{
                paper: {
                    style: {
                    maxHeight: 48* 4.5,
                    width: '20ch',
                    backgroundColor:'var(--main-color)',
                    color:'var(--white-color)',
                    },
                },
                }}
            >
                {options.map((option,index) => (
                <MenuItem key={index} onClick={()=>{navigate(option.href)}}>
                    {option.text}
                </MenuItem>
                ))}
            </Menu>
            </div>
    );
};
  
export default MobileToggle;