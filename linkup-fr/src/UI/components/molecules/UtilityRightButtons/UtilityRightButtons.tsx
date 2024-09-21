'use client';
import React, { useEffect, useState } from 'react';
import IconWithHover from "@/UI/components/atoms/IconHover/IconHover";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SwitchMode from "@/UI/components/atoms/SwitchDarkMode/SwitchDarkMode";
import './UtilityRightButtons.css';

interface IUtilityRightButtonsProps {
  isDarkMode?: boolean;
  responsive?: boolean; // Propiedad opcional
  hideMediaIcons?: boolean; // Nueva propiedad opcional
}

const UtilityRightButtons: React.FC<IUtilityRightButtonsProps> = ({ isDarkMode, responsive, hideMediaIcons }) => {
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
    <div className="utility-right-buttons">
      {!hideMediaIcons && (
        <div className={responsive ? "media-icons-responsive" : "media-icons"}>
          <IconWithHover
            icon={<InstagramIcon fontSize="inherit" />}
            color="var(--paragraph-color)"
            hoverColor="#FF00FF"
            onClick={() => { window.open('https://www.instagram.com/riwi.io/?hl=en') }}
            isDarkMode={isDarkMode}
          />
          <IconWithHover
            icon={<WhatsAppIcon fontSize="inherit" />}
            color="var(--paragraph-color)"
            hoverColor="#25D366"
            onClick={() => { window.open('https://wa.link/tptm6j') }}
            isDarkMode={isDarkMode}
          />
        </div>
      )}
      <div className={responsive ? "switch-mode-home-responsive" : "switch-mode-home"}>
        <SwitchMode onClick={() => { }} />
      </div>
    </div>
  );
};

export default UtilityRightButtons;


