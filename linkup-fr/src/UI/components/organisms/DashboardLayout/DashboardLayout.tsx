import "./dashboardLayoutStyles.css";
import React, { ReactElement, ReactNode, useState } from "react";
import { Footer, Header } from "../../molecules";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Filter } from "../../molecules";
import { TitleMain } from "../../atoms";
import { usePathname, useSearchParams } from "next/navigation";

interface IDashboardLayoutProps {
  section: ReactElement;
  titleView: string;
  subtitle: string;
  language: any;
  isDarkMode?: boolean;
  render?:boolean;
  setRender?: (value:boolean) => void;
}

export default function DashboardLayout({
  section,
  titleView,
  subtitle,
  language,
  isDarkMode,
  render,
  setRender
}: IDashboardLayoutProps): React.ReactElement {
  const [expand, setExpand] = useState<boolean>(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleButtonExpand = () => {
    setExpand(!expand);
    console.log("do something");
  };

  const optionsFilter = pathname === "/admin/coder" || pathname === "/dashboard" || pathname === "/config" || searchParams.toString() !== "";;

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
          <TitleMain
            className="titleMain"
            title={optionsFilter ? ""  : "Filters"}
            subtitle=""
          />
          {optionsFilter ? null : <Filter render={render} setRender={setRender} />}
          {section}
        </main>
        <Footer isDarkMode={isDarkMode}/>
      </div>
    </div>
  );
}
