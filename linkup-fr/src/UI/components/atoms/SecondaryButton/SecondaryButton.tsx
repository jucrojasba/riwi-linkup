'use client'

import { ButtonProps } from '@/UI/interfaces/Button';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const SecondaryButtonStyle = styled(Button)(() => ({
  backgroundColor: "transparent",
  color: "var(--main-color)",
  borderColor: "var(--main-color)",
  borderRadius: "5px",
  textTransform: "none",
  fontFamily: "var(--main-font)",
  minWidth: "fit-content",
}));

const SecondaryButton:React.FC<ButtonProps>=({type='button',text,onClick })=>{
  return(
    <SecondaryButtonStyle type={type} variant="outlined" onClick={onClick}>
      {text}
    </SecondaryButtonStyle>
  );
};

export default SecondaryButton;