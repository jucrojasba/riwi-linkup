'use client'

import { ButtonProps } from '@/UI/interfaces/Button';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';


const MainButtonStyle = styled(Button)(() => ({
  backgroundColor: 'var(--main-color)',
  borderRadius:'10px',
  textTransform:'none',
  fontFamily:'var(--main-font)',
}));

const MainButton:React.FC<ButtonProps>=({text,onClick,type='button'})=>{
  return(
    <MainButtonStyle type={type} variant="contained" onClick={onClick}>
      {text}
    </MainButtonStyle>
  );
};

export default MainButton;