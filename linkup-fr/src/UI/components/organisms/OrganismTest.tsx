//This is the standar for naming file
'use client'

import { ButtonProps } from '@/UI/interfaces/Button';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const MainButtonStyle = styled(Button)(() => ({
  backgroundColor: 'var(--main-color)',
  borderRadius:'10px'
}));

const MainButton:React.FC<ButtonProps>=({type='button',text,onClick })=>{
  return(
    <MainButtonStyle type={type} variant="contained" onClick={onClick}>
      {text}
    </MainButtonStyle>
  );
};

export default MainButton;