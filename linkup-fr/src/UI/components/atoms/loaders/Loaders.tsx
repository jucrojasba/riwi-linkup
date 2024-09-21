import './Loaders.css';
import CircularProgress from '@mui/material/CircularProgress';
import { LinearProgress } from '@mui/material';
import { useDarkMode } from '@/global-states/dark-mode';

interface LoaderProps {
    flag: boolean;
}

export const CircularLoader = ({ flag }: LoaderProps) => {
    const DarkMode = useDarkMode((state)=>state.DarkMode);
    return flag ? (
        <div className='loader-container-display'>
            <div className='circular-loader-container'>
                <img src="./icons/logoR.svg" alt="Riwi" />
                <div className={DarkMode?'circular-loader-dark-mode':'circular-loader'}>
                    <CircularProgress size={100} thickness={1} sx={{ color: 'var(--main-color)' }} />
                </div>
            </div>
        </div>
    ) : null;
};

export const LinearLoader = ({ flag }: LoaderProps) => {
    return flag ? (
        <div className="linear-loader">
            <LinearProgress sx={{
                backgroundColor: 'var(--gray-color)',
                '& .MuiLinearProgress-bar': {
                    backgroundColor: 'var(--main-color)'
                }
            }} />
        </div>
    ) : null;
};
