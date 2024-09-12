import "./headerStyles.css";
import React from "react";
import TitleMain from "../../atoms/TitleMain/TitleMain";
import Search from "../Search/Search";
import Sidebar from "../Sidebar/Sidebar";
import SwitchMode from "../../atoms/SwitchDarkMode/SwitchDarkMode";
import SelectLanguage from "../../atoms/SwitchLanguage/SwitchLanguage";

interface IHeaderProps {
  expand: boolean;
}
export default function Header({ expand }: IHeaderProps): React.ReactNode {
  const handlerClick = () => {};
  return (
    <header className="header">
      <Sidebar expand={expand} />
      <div className="section-content-coders">
        <TitleMain
          className="content-coders-title"
          title="Coders"
          subtitle="General Information"
        />
        <SelectLanguage />
        <Search />
        <SwitchMode onClick={handlerClick} horizontalMode={true}/>
      </div>
    </header>
  );
}
