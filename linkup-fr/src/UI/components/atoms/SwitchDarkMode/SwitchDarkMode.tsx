'use client'

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { ButtonProps } from '@/UI/interfaces/Button';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { useDarkMode } from '@/global-states/dark-mode';

const SwitchModeStyle = styled(Button)(() => ({
    backgroundColor: 'var(--main-color)',
    borderRadius: '50px', 
    cursor: 'pointer',
    height: '80px', 
    width: '30px',  
    padding: '0px',
    minWidth: '30px',
}));

const IconStyle = styled('div')<{ rotate: boolean }>(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.5s ease',
}));

const SwitchMode: React.FC<ButtonProps> = ({ type = 'button' }) => {
    const { DarkMode, setDarkMode } = useDarkMode();

    const handleClick = () => {
        setDarkMode(!DarkMode);
    };

    return (
        <SwitchModeStyle type={type} variant="contained" onClick={handleClick}>
            <IconStyle rotate={DarkMode} style={{ transform: DarkMode ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                {DarkMode ? (
                    <DarkModeIcon style={{ fontSize: '22px' }} />  
                ) : (
                    <LightModeIcon style={{ fontSize: '22px' }} />  
                )}
            </IconStyle>
        </SwitchModeStyle>
    );
};

export default SwitchMode;


