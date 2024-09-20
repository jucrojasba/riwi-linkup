"use client";

import { ReactElement, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

interface IconWithHoverProps {
  icon: ReactElement;
  color: string;
  hoverColor: string;
  onClick?: () => void;
  isDarkMode: boolean;
}

const StyledIcon = styled("div")<{
  color: string;
  hoverColor: string;
  fontSize: string; // Agregamos fontSize como propiedad
}>(({ color, hoverColor, fontSize }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: fontSize, // Usamos la propiedad fontSize aquí
  color: color,
  transition: "background-color 0.3s ease",
  "&:hover": {
    color: hoverColor,
    cursor: "pointer",
  },
}));

const IconWithHover: React.FC<IconWithHoverProps> = ({
  icon,
  color,
  hoverColor,
  onClick,
  isDarkMode,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [fontSize, setFontSize] = useState("2.5rem"); // Estado para el tamaño de fuente

  useEffect(() => {
    // Obtiene el valor de la variable CSS --breakpoint-md
    const breakpoint = getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-md').trim();
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint})`);
    
    const handleResize = () => {
      setFontSize(mediaQuery.matches ? "1.8rem" : "2.5rem"); // Cambia el tamaño de fuente
    };

    // Inicializa el estado
    handleResize();

    // Agrega el listener
    mediaQuery.addEventListener('change', handleResize);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  return (
    <StyledIcon
      color={isDarkMode ? 'white' : color}
      hoverColor={hoverColor}
      fontSize={fontSize} // Pasamos fontSize al StyledIcon
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {icon}
    </StyledIcon>
  );
};

export default IconWithHover;


