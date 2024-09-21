import "./headerStyles.css";
import React from "react";
import TitleMain from "../../atoms/TitleMain/TitleMain";
import Search from "../Search/Search";
import Sidebar from "../Sidebar/Sidebar";
import SwitchMode from "../../atoms/SwitchDarkMode/SwitchDarkMode";
import SelectLanguage from "../../atoms/SwitchLanguage/SwitchLanguage";

interface IHeaderProps {
  expand: boolean;
  titleView: string;
  subtitle: string;
  path: string;
  language:boolean;
}
export default function Header({ expand, titleView, subtitle, path, language }: IHeaderProps): React.ReactNode {
  const handlerClick = () => {};
  return (
    <header className="header">
      <Sidebar isExpanded={expand} language={language}/>
      <div className="section-content-coders">
        <TitleMain
          className="content-coders-title"
          title={titleView}
          subtitle={subtitle}
        />
        <SelectLanguage />
        <Search />
        <SwitchMode onClick={handlerClick} horizontalMode={true}/>
      </div>
    </header>
  );
}
