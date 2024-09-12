import "./dashboardLayoutStyles.css";
import React, { ReactElement, ReactNode, useState } from "react";
import { Footer, Header } from "../../molecules";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Filter } from "../../molecules";
import TitleMain from "../../atoms/TitleMain/TitleMain";
import SectionCoders from "../SectionCoders/SectionCoders";

interface IDashboardLayoutProps {
  section: ReactElement;
}

export default function DashboardLayout(
  section: IDashboardLayoutProps
): React.ReactNode {
  const [expand, setExpand] = useState<boolean>(false);
  const handleButtonExpand = () => {
    setExpand(!expand);
    console.log("do something");
  };
  return (
    <div className="content-dashboard">
      <div className="open" onClick={handleButtonExpand}>
        <KeyboardArrowDownIcon />
      </div>
      <Header expand={expand} />
      <main className="main">
        <TitleMain className="titleMain" title="Filters" subtitle="" />
        <Filter />
        <SectionCoders />
      </main>
      <Footer />
    </div>
  );
}
