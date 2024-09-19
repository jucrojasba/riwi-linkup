import './Loaders.css';
import CircularProgress from '@mui/material/CircularProgress';
import { LinearProgress } from '@mui/material';

interface LoaderProps {
    flag: boolean;
}

export const CircularLoader = ({ flag }: LoaderProps) => {
    return flag ? (
        <div className='loader-container-display'>
            <div className='circular-loader-container'>
                <img src="./icons/logoR.svg" alt="Riwi" />
                <div className='circular-loader'>
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
