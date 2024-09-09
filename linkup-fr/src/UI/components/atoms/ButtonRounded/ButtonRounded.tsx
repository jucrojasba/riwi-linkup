"use client";

import { ButtonProps } from "@/UI/interfaces/Button";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useState } from "react";

interface RoundedButtonProps extends ButtonProps {
  expandMessage: any;
}

const RoundedButtonStyle = styled(Button)(() => ({
  backgroundColor: "var(--main-color)",
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
}));

const RoundedButton: React.FC<RoundedButtonProps> = ({
  text,
  expandMessage,
  onClick,
  type = "button",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <RoundedButtonStyle
      type={type}
      variant="contained"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? expandMessage : text}
    </RoundedButtonStyle>
  );
};

export default RoundedButton;
