import "./dashboardLayoutStyles.css";
import React, { ReactElement, useState, useEffect } from "react";
import { Footer, Header, UtilityRightButtons } from "../../molecules";
import { usePathname } from "next/navigation";
import { useExpand } from "@/global-states/expandSideBar";

interface IDashboardLayoutProps {
  section: ReactElement;
  titleView: string;
  subtitle: string;
  language: any;
  isDarkMode?: boolean;
}

export default function DashboardLayout({
  section,
  titleView,
  subtitle,
  language,
  isDarkMode,
}: IDashboardLayoutProps): React.ReactElement {
  const expand = useExpand((state) => state.expand);
  const pathname = usePathname();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 794);

    // Ejecutar al inicio
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={isDarkMode ? 'content-layout-dark-mode' : "content-layout"}>
      <div className="content-dashboard">
        <Header
          expand={expand}
          titleView={titleView}
          subtitle={subtitle}
          path={pathname}
          language={language}
        />
        <main className={isSmallScreen ? "mainGeneralCollapsed" : expand ? "mainGeneralCollapsed" : "mainGeneral"}>
          {section}
        </main>
        <Footer isDarkMode={isDarkMode} />
      </div>
      <UtilityRightButtons responsive={true} hideMediaIcons={true} isDarkMode={isDarkMode}/> 
    </div>
  );
}
