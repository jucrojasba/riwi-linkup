import "./dashboardLayoutStyles.css";
import React, { ReactElement, useState } from "react";
import { Footer, Header } from "../../molecules";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
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
  const expand=useExpand((state)=>state.expand);
  const pathname = usePathname();


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
        <main className={expand ? "mainGeneralCollapsed" : "mainGeneral"}>
          {section}
        </main>
        <Footer isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}

