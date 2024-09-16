"use client";

import { ReactElement, useState } from "react";
import { styled } from "@mui/material/styles";

interface IconWithHoverProps {
  icon: ReactElement;
  color: string;
  hoverColor: string;
  onClick?: () => void;
  isDarkMode: boolean;
}

const StyledIcon = styled("div")<{ color: string; hoverColor: string }>(
  ({ color, hoverColor }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2.5rem",
    color: color,
    transition: "background-color 0.3s ease",
    "&:hover": {
      color: hoverColor,
      cursor: "pointer",
    },
  })
);

const IconWithHover: React.FC<IconWithHoverProps> = ({
  icon,
  color,
  hoverColor,
  onClick,
  isDarkMode,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <StyledIcon
      color={isDarkMode? 'white':color}
      hoverColor={hoverColor}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick} 
    >
      {icon}
    </StyledIcon>
  );
};

export default IconWithHover;

