"use client";

import { ButtonProps } from "@/UI/interfaces/Button";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useState } from "react";

interface RoundedButtonProps extends ButtonProps {
  expandMessage?: any;
  bgColor?: string;
}

const RoundedButtonStyle = styled(Button)<{ bgColor?: string }>(({ bgColor }) => ({
  backgroundColor: bgColor || "var(--main-color)",
  borderRadius: "80px",
  textTransform: "none",
  textAlign: "start",
  fontFamily: "var(--main-font)",
  fontSize: "1.5rem",
  transition: "width .4s ease",
  width: "180px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  display: "flex",
  gap: "var(--padding-min)",
  boxShadow: "none",
  "&:hover": {
    scale: "1",
    width: "240px",
    filter: "brightness(0.90)",
    boxShadow: "none",
    textAlign: "start",
  },
  /* Para dispositivos extra pequeños (menos de 576px) */
  "@media (max-width: 575px)": {
    fontSize: "1rem",
    width: "150px",
    "&:hover": {
      width: "200px",
    },
  },
  /* Para dispositivos pequeños (576px a 767px) */
  "@media (min-width: 576px) and (max-width: 767px)": {
    fontSize: "1.2rem",
    width: "160px",
    "&:hover": {
      width: "220px",
    },
  },
  /* Para tablets (768px a 991px) */
  "@media (min-width: 768px) and (max-width: 991px)": {
    fontSize: "1.3rem",
    width: "170px",
    "&:hover": {
      width: "230px",
    },
  },
  /* Para laptops (992px a 1199px) */
  "@media (min-width: 992px) and (max-width: 1199px)": {
    fontSize: "1.4rem",
    width: "180px",
    "&:hover": {
      width: "240px",
    },
  },
  /* Para dispositivos extra grandes (1200px en adelante) */
  "@media (min-width: 1200px)": {
    fontSize: "1.5rem",
    width: "180px",
    "&:hover": {
      width: "240px",
    },
  },
}));

const RoundedButton: React.FC<RoundedButtonProps> = ({
  text,
  expandMessage,
  onClick,
  type = "button",
  bgColor,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <RoundedButtonStyle
      type={type}
      variant="contained"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      bgColor={bgColor}
    >
      {isHovered ? expandMessage : text}
    </RoundedButtonStyle>
  );
};

export default RoundedButton;
