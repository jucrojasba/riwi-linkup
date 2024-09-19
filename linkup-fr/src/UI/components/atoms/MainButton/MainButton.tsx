'use client';

import { ButtonProps } from "@/UI/interfaces/Button";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import "./mainButtonStyles.css";

interface MainButtonProps extends ButtonProps {
  bgColor?: string;
}

const MainButtonStyle = styled(Button)<{ customBgColor?: string }>(({ customBgColor }) => ({
  backgroundColor: customBgColor || 'var(--main-color)', 
  borderRadius: 'var(--border-radius-min)',
  textTransform: 'none',
  fontFamily: 'var(--main-font)',
  minWidth: 'fit-content',
  fontSize: '1rem',
}));

const MainButton: React.FC<MainButtonProps> = ({
  icon,
  text,
  onClick,
  type = "button",
  className,
  bgColor,
  ...rest 
}) => {
  return (
    <MainButtonStyle
      type={type}
      variant="contained"
      onClick={onClick}
      className={className}
      sx={{ backgroundColor: bgColor }} 
      {...rest} 
    >
      {icon}
      {text}
    </MainButtonStyle>
  );
};

export default MainButton;

