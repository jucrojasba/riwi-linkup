import CircularProgress from '@mui/material/CircularProgress';
import './Loaders.css';
import Image from 'next/image';
import { LinearProgress } from '@mui/material';

export const CircularLoader=()=>{
    return(
        <div className='circular-loader-container'>
            <img src="./logoR.svg" alt="Riwi"></img>
            <div className='circular-loader'>
                <CircularProgress size={100} thickness={1} sx={{color:'var(--main-color)'}}/>
            </div>
        </div>
        
    );
};

export const LinearLoader=()=>{
    return(
        <LinearProgress sx={{
            backgroundColor: 'var(--gray-color)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: 'var(--main-color)'
            }
          }}/>
    );
}