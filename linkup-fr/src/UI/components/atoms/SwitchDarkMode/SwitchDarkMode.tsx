import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { ButtonProps } from '@/UI/interfaces/Button';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { useDarkMode } from '@/global-states/dark-mode';
import { useEffect, useState } from 'react';

interface SwitchModeProps extends ButtonProps {
    horizontalMode?: boolean;
}

const SwitchModeStyle = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'horizontalMode'
})<{ horizontalMode: boolean; borderRadius: string }>(({ horizontalMode, borderRadius }) => ({
    backgroundColor: 'var(--main-color)',
    borderRadius: borderRadius, // Usamos la propiedad borderRadius aquí
    cursor: 'pointer',
    height: horizontalMode ? '30px' : '80px',
    width: horizontalMode ? '80px' : '30px',
    padding: '0px',
    minWidth: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.5s ease',
}));

const IconStyle = styled('div', {
    shouldForwardProp: (prop) => prop !== 'rotate'
})<{ rotate: boolean }>(({ rotate }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.5s ease',
    transform: rotate ? 'rotate(90deg)' : 'rotate(0deg)',
}));

const SwitchMode: React.FC<SwitchModeProps> = ({ type = 'button', horizontalMode = false }) => {
    const { DarkMode, setDarkMode } = useDarkMode();
    const [borderRadius, setBorderRadius] = useState('50px'); // Estado para borderRadius

    useEffect(() => {
        // Obtiene el valor de la variable CSS --breakpoint-md
        const breakpoint = getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-md').trim();
        const mediaQuery = window.matchMedia(`(max-width: ${breakpoint})`);
        
        const handleResize = () => {
            setBorderRadius(mediaQuery.matches ? '0 10px 10px 0' : '50px'); // Cambia el borderRadius
        };

        // Inicializa el estado
        handleResize();

        // Agrega el listener
        mediaQuery.addEventListener('change', handleResize);

        // Cleanup
        return () => {
            mediaQuery.removeEventListener('change', handleResize);
        };
    }, []);

    const handleClick = () => {
        setDarkMode(!DarkMode);
    };

    return (
        <SwitchModeStyle type={type} variant="contained" onClick={handleClick} horizontalMode={horizontalMode} borderRadius={borderRadius}>
            <IconStyle rotate={DarkMode}> 
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
