"use client";

import { ButtonProps, IconButtonProps } from "@/UI/interfaces/Button";
import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';


const IconButtonStyle = styled(IconButton)(() => ({
  backgroundColor: "var(--secondary-color)",
  borderRadius: "var(--border-radius-min)",
  textTransform: "none",
  fontFamily: "var(--main-font)",
  minWidth: "fit-content",
  fontSize: "1rem",
}));

const CustomIconButton: React.FC<IconButtonProps> = ({
  icon,
  iconColor='var(--main-color)',
  backgroundColor='transparent',
  onClick,
  className
}) => {
  return (
    <IconButtonStyle className={className} onClick={onClick} sx={{width:'100px',color:iconColor,backgroundColor:'transparent','&:hover':{backgroundColor: backgroundColor, color: iconColor},}}>
      {icon==='google'?<GoogleIcon/>:icon==='github'?<GitHubIcon/>:''}
    </IconButtonStyle>
  );
};

export default CustomIconButton;
