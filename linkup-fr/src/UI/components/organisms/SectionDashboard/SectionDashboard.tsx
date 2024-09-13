'use client'

import DashboardCardsContainer from "../DashboardCardsContainer/DashboardCardsContainer";

interface ISectionDashborad{
    isDarkMode:boolean
}

const SectionDashboard: React.FC<ISectionDashborad> = ({isDarkMode})=>{
    return (
        <DashboardCardsContainer/>
    );
};

export default SectionDashboard;