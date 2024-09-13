'use client'

import BarChart from "../../atoms/BarChart/BarChart";
import DashboardCardsContainer from "../DashboardCardsContainer/DashboardCardsContainer";

interface ISectionDashborad{
    isDarkMode:boolean,
    language:boolean
}

const SectionDashboard: React.FC<ISectionDashborad> = ({isDarkMode, language})=>{
    return (
        <DashboardCardsContainer language={language}/>
        <BarChart/>
    );
};

export default SectionDashboard;