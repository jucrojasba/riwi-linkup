import './Loaders.css'; // Importing CSS styles for the loaders
import CircularProgress from '@mui/material/CircularProgress'; // Importing Material-UI's CircularProgress component
import { LinearProgress } from '@mui/material'; // Importing Material-UI's LinearProgress component
import { useDarkMode } from '@/global-states/dark-mode'; // Importing custom hook for dark mode state

// Interface defining props for the loader components
interface LoaderProps {
    flag: boolean; // Indicates whether to show the loader
}

// Circular Loader Component
export const CircularLoader = ({ flag }: LoaderProps) => {
    // Using the dark mode state
    const DarkMode = useDarkMode((state) => state.DarkMode);
    
    return flag ? ( // Conditional rendering based on flag
        <div className='loader-container-display'>
            <div className='circular-loader-container'>
                <img src="./icons/logoR.svg" alt="Riwi" /> {/* Logo image */}
                <div className={DarkMode ? 'circular-loader-dark-mode' : 'circular-loader'}>
                    <CircularProgress size={100} thickness={1} sx={{ color: 'var(--main-color)' }} />
                </div>
            </div>
        </div>
    ) : null; // Return null if flag is false
};

// Linear Loader Component
export const LinearLoader = ({ flag }: LoaderProps) => {
    return flag ? ( // Conditional rendering based on flag
        <div className="linear-loader">
            <LinearProgress sx={{
                backgroundColor: 'var(--gray-color)', // Background color for the loader
                '& .MuiLinearProgress-bar': {
                    backgroundColor: 'var(--main-color)' // Color for the progress bar
                }
            }} />
        </div>
    ) : null; // Return null if flag is false
};
