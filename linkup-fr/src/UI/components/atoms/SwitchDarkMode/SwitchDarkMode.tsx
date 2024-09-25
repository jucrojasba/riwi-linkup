import DarkModeIcon from '@mui/icons-material/DarkMode'; // Importing the dark mode icon
import LightModeIcon from '@mui/icons-material/LightMode'; // Importing the light mode icon
import { ButtonProps } from '@/UI/interfaces/Button'; // Importing ButtonProps interface for typing
import { styled } from '@mui/material/styles'; // Importing styled for custom styling
import { Button } from '@mui/material'; // Importing Button component from Material-UI
import { useDarkMode } from '@/global-states/dark-mode'; // Importing custom hook for dark mode state
import { useEffect, useState } from 'react'; // Importing React hooks for state and lifecycle management

// Extending ButtonProps with additional props for the SwitchMode component
interface SwitchModeProps extends ButtonProps {
    horizontalMode?: boolean; // Optional prop to determine orientation
}

// Styled component for the switch mode button
const SwitchModeStyle = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'horizontalMode' // Prevents passing horizontalMode prop to the DOM
})<{ horizontalMode: boolean; borderRadius: string }>(({ horizontalMode, borderRadius }) => ({
    backgroundColor: 'var(--main-color)', // Background color from CSS variable
    borderRadius: borderRadius, // Border radius applied
    cursor: 'pointer', // Change cursor to pointer on hover
    height: horizontalMode ? '30px' : '80px', // Height based on orientation
    width: horizontalMode ? '80px' : '30px', // Width based on orientation
    padding: '0px', // No padding
    minWidth: '30px', // Minimum width
    display: 'flex', // Flexbox layout for centering icons
    alignItems: 'center', // Center align items vertically
    justifyContent: 'center', // Center align items horizontally
    transition: 'all 0.5s ease', // Smooth transition for changes
    zIndex: '4', // Z-index for stacking context
}));

// Styled component for the icon container
const IconStyle = styled('div', {
    shouldForwardProp: (prop) => prop !== 'rotate' // Prevents passing rotate prop to the DOM
})<{ rotate: boolean }>(({ rotate }) => ({
    display: 'flex', // Flexbox layout
    alignItems: 'center', // Center align items vertically
    justifyContent: 'center', // Center align items horizontally
    transition: 'transform 0.5s ease', // Smooth transition for rotation
    transform: rotate ? 'rotate(90deg)' : 'rotate(0deg)', // Rotate based on DarkMode state
    zIndex: '4', // Z-index for stacking context
}));

// Main SwitchMode component
const SwitchMode: React.FC<SwitchModeProps> = ({ type = 'button', horizontalMode = false }) => {
    const { DarkMode, setDarkMode } = useDarkMode(); // Using the custom hook to get dark mode state and setter
    const [borderRadius, setBorderRadius] = useState('50px'); // State for border radius

    useEffect(() => {
        // Get the CSS variable --breakpoint-md
        const breakpoint = getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-md').trim();
        const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}`); // Media query for responsiveness
        
        const handleResize = () => {
            setBorderRadius(mediaQuery.matches ? '0 10px 10px 0' : '50px'); // Change border radius based on screen size
        };

        // Initialize state
        handleResize();

        // Add listener for screen resize
        mediaQuery.addEventListener('change', handleResize);

        // Cleanup listener on component unmount
        return () => {
            mediaQuery.removeEventListener('change', handleResize);
        };
    }, []); // Empty dependency array to run once on mount

    // Toggle dark mode state on button click
    const handleClick = () => {
        setDarkMode(!DarkMode);
    };

    return (
        <SwitchModeStyle type={type} variant="contained" onClick={handleClick} horizontalMode={horizontalMode} borderRadius={borderRadius}>
            <IconStyle rotate={DarkMode}> 
                {DarkMode ? ( // Conditional rendering of icons based on dark mode state
                    <DarkModeIcon style={{ fontSize: '22px' }} />
                ) : (
                    <LightModeIcon style={{ fontSize: '22px' }} />
                )}
            </IconStyle>
        </SwitchModeStyle>
    );
};

export default SwitchMode; // Exporting the SwitchMode component
