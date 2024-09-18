"use client";

import { ButtonProps } from "@/UI/interfaces/Button";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useState } from "react";

interface CustomButtonProps extends ButtonProps {
  initialText: any;
  clickedText: any;
  initialBgColor: string;
  clickedBgColor: string;
  secondOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Segunda lógica para el nuevo estado
}

const CustomButtonStyle = styled(Button)<{ bgColor?: string }>(({ bgColor }) => ({
  backgroundColor: bgColor || "var(--main-color)", 
  borderRadius: "80px",
  textTransform: "none",
  textAlign: "center",
  fontFamily: "var(--main-font)",
  fontSize: "1rem",
  width: "fit-content",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.1rem 0.6rem",
  gap: "0.5rem",
  boxShadow: "none",
  color:'var(--white-color)',
  "&:hover": {
    filter: "brightness(0.95)",
    boxShadow: "none",
  },
}));

const CustomButton: React.FC<CustomButtonProps> = ({
  initialText,
  clickedText,
  onClick,
  secondOnClick,
  initialBgColor,
  clickedBgColor,
  type = "button",
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isClicked) {
      onClick?.(event); // Lógica inicial, pasa el evento
      setIsClicked(true); // Cambia al estado clickeado
    } else {
      secondOnClick?.(event); // Segunda lógica, pasa el evento
      setIsClicked(false); // Vuelve al estado inicial
    }
  };

  return (
    <CustomButtonStyle
      type={type}
      variant="contained"
      onClick={handleClick}
      bgColor={isClicked ? clickedBgColor : initialBgColor}
    >
      {isClicked ? clickedText : initialText}
    </CustomButtonStyle>
  );
};

export default CustomButton;
