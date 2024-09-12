'use client'

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { ButtonProps } from '@/UI/interfaces/Button';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { useDarkMode } from '@/global-states/dark-mode';

interface SwitchModeProps extends ButtonProps {
    horizontalMode?: boolean; // Nueva propiedad opcional
}

const SwitchModeStyle = styled(Button)<{ horizontal: boolean }>(({ horizontal }) => ({
    backgroundColor: 'var(--main-color)',
    borderRadius: '50px', 
    cursor: 'pointer',
    height: horizontal ? '30px' : '80px', 
    width: horizontal ? '80px' : '30px',  
    padding: '0px',
    minWidth: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.5s ease', 
}));

const IconStyle = styled('div')<{ rotate: boolean | undefined }>(({ rotate }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.5s ease',
    transform: rotate ? 'rotate(90deg)' : 'rotate(0deg)',
}));

const SwitchMode: React.FC<SwitchModeProps> = ({ type = 'button', horizontalMode = false }) => {
    const { DarkMode, setDarkMode } = useDarkMode();

    const handleClick = () => {
        setDarkMode(!DarkMode);
    };

    return (
        <SwitchModeStyle type={type} variant="contained" onClick={handleClick} horizontal={horizontalMode}>
            <IconStyle rotate={DarkMode ? true : undefined}> 
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


