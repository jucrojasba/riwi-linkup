import "./headerStyles.css";
import React, { useState, useEffect } from "react";
import TitleMain from "../../atoms/TitleMain/TitleMain";
import Search from "../Search/Search";
import Sidebar from "../Sidebar/Sidebar";
import SwitchMode from "../../atoms/SwitchDarkMode/SwitchDarkMode";
import SelectLanguage from "../../atoms/SwitchLanguage/SwitchLanguage";
import AuthenticatedMenuToggle from "../AuthenticatedMenuToggle/AuthenticatedMenuToggle";

interface IHeaderProps {
  expand: boolean;
  titleView: string;
  subtitle: string;
  path: string;
  language: boolean;
}

export default function Header({ expand, titleView, subtitle, path, language }: IHeaderProps): React.ReactNode {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Obtener el valor de la variable CSS
    const breakpoint = getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-md').trim();
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint})`);

    const handleResize = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    
    // Establece el estado inicial
    setIsMobile(mediaQuery.matches);
    
    // Escucha los cambios en el tamaño de la pantalla
    mediaQuery.addEventListener("change", handleResize);

    // Limpia el evento cuando el componente se desmonta
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  const handlerClick = () => {};

  return (
    <header className="header">
      {isMobile && <AuthenticatedMenuToggle language={language} />}
      {!isMobile && <Sidebar isExpanded={expand} language={language} />}
      <div className="section-content-coders">
        <TitleMain
          className="content-coders-title"
          title={titleView}
          subtitle={subtitle}
        />
        {!isMobile && <SelectLanguage />}
        <Search />
        {!isMobile && <SwitchMode onClick={handlerClick} horizontalMode={true} />}
      </div>
    </header>
  );
}
