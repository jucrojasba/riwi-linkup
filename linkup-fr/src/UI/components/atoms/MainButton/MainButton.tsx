"use client";

import { ButtonProps } from "@/UI/interfaces/Button";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";


const MainButtonStyle = styled(Button)(() => ({
  backgroundColor: "var(--main-color)",
  borderRadius: "var(--border-radius-min)",
  textTransform: "none",
  fontFamily: "var(--main-font)",
  minWidth: "fit-content",
  fontSize: "1rem",
}));

const MainButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = "button",
  className,
}) => {
  return (
    <MainButtonStyle type={type} variant="contained" onClick={onClick} className={className}>
      {text}
    </MainButtonStyle>
  );
};

export default MainButton;
