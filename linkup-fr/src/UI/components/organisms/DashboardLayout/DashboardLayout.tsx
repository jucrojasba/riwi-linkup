import "./dashboardLayoutStyles.css";
import React, { ReactElement, ReactNode, useState } from "react";
import { Footer, Header } from "../../molecules";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { usePathname } from "next/navigation";

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
  const [expand, setExpand] = useState<boolean>(false);
  const pathname = usePathname();

  const handleButtonExpand = () => {
    setExpand(!expand);
    console.log("do something");
  };

  return (
    <div className={isDarkMode?'content-layout-dark-mode':"content-layout"}>
      <div className="content-dashboard">
        <div className="open" onClick={handleButtonExpand}>
          <KeyboardArrowDownIcon />
        </div>
        <Header
          expand={expand}
          titleView={titleView}
          subtitle={subtitle}
          path={pathname}
          language={language}
        />
        <main className={"mainGeneral"}>
          {section}
        </main>
        <Footer isDarkMode={isDarkMode}/>
      </div>
    </div>
  );
}
