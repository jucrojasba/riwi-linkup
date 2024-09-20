'use client';
import Image from "next/image";
import "./RiwiLogo.css";
import { useEffect, useState } from "react";

interface IRiwiLogoProps {
  isDarkMode: boolean;
  responsive?: boolean; // Propiedad opcional
}

export default function RiwiLogo({
  isDarkMode,
  responsive,
}: IRiwiLogoProps): React.ReactNode {
  const [isBelowMediumScreen, setIsBelowMediumScreen] = useState(false);

  useEffect(() => {
    if (responsive) {
      const breakpoint = getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-md').trim();
      const mediaQuery = window.matchMedia(`(max-width: ${breakpoint})`);
      const handleResize = () => setIsBelowMediumScreen(mediaQuery.matches);

      handleResize(); // Inicializa el estado
      mediaQuery.addEventListener('change', handleResize); // Agrega el listener

      return () => {
        mediaQuery.removeEventListener('change', handleResize); // Cleanup
      };
    }
  }, [responsive]);

  // Si no es responsive o estamos por encima del breakpoint, renderizamos normalmente
  if (responsive && !isBelowMediumScreen) {
    return null;
  }

  return (
    <div className="riwi-logo-container">
      <Image
        className="nav-logo"
        src={isDarkMode ? "/icons/logoRiwiPurple.svg" : "/icons/logoRiwi.svg"}
        alt="Riwi"
        width={90}
        height={40}
      />
    </div>
  );
}
