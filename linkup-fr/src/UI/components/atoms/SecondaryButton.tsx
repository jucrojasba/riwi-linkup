'use client'

import { ButtonProps } from '@/UI/interfaces/Button';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const SecondaryButtonStyle = styled(Button)(() => ({
  backgroundColor: 'var(--white-color)',
  color:'var(--main-color)',
  borderColor: 'var(--main-color)',
  borderRadius:'10px',
  textTransform:'none',
  fontFamily:'var(--main-font)',
}));

const SecondaryButton:React.FC<ButtonProps>=({type='button',text,onClick })=>{
  return(
    <SecondaryButtonStyle type={type} variant="outlined" onClick={onClick}>
      {text}
    </SecondaryButtonStyle>
  );
};

export default SecondaryButton;