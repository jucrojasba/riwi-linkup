import "./dashboardLayoutStyles.css";
import React, { ReactElement, ReactNode, useState } from "react";
import { Footer, Header } from "../../molecules";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Filter } from "../../molecules";
import TitleMain from "../../atoms/TitleMain/TitleMain";
import { useLanguage } from "@/global-states/language-mode";
import { Language } from "@mui/icons-material";

interface IDashboardLayoutProps {
  section: ReactElement;
  titleView: string;
  subtitle: string;
  path: string;
  language: any;
  setRender?: (value:boolean) => void;
}

export default function DashboardLayout({
  section,
  titleView,
  subtitle,
  path,
  language,
  setRender
}: IDashboardLayoutProps): React.ReactElement {
  const [expand, setExpand] = useState<boolean>(false);

  const handleButtonExpand = () => {
    setExpand(!expand);
    console.log("do something");
  };

  return (
    <div className="content-layout">
      <div className="content-dashboard">
        <div className="open" onClick={handleButtonExpand}>
          <KeyboardArrowDownIcon />
        </div>
        <Header
          expand={expand}
          titleView={titleView}
          subtitle={subtitle}
          path={path}
          language={language}
        />
        <main className={"mainGeneral"}>
          <TitleMain
            className="titleMain"
            title={path === "/admin/coder" || path === "/dashboard" || path === "/config" ? "" : "Filters"}
            subtitle=""
          />
          {path === "/admin/coder" || path === "/dashboard" || path === "/config"  ? null : <Filter setRender={setRender} />}
          {section}
        </main>
        <Footer />
      </div>
    </div>
  );
}
