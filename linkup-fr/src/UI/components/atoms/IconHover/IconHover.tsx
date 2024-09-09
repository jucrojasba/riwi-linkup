"use client";

import { ReactElement, useState } from "react";
import { styled } from "@mui/material/styles";
import Icon from "@mui/material/Icon";

interface IconWithHoverProps {
  icon: ReactElement;
  color: string;
  hoverColor: string;
}

const StyledIcon = styled("div")<{ color: string; hoverColor: string }>(
  ({ color, hoverColor }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize:"3rem",
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
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <StyledIcon
      color={color}
      hoverColor={hoverColor}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon}
    </StyledIcon>
  );
};

export default IconWithHover;
