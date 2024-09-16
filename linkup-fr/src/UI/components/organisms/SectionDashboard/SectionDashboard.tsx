'use client'

import { getCompaniesByMonth } from "@/services/coderService";
import BarChart from "../../atoms/BarChart/BarChart";
import DashboardCardsContainer from "../DashboardCardsContainer/DashboardCardsContainer";
import { useEffect, useState } from "react";
import { LinearLoader } from "../../atoms";
import './SectionDashboardStyles.css'

interface ISectionDashboard {
    isDarkMode: boolean;
    language: boolean;
}

const SectionDashboard: React.FC<ISectionDashboard> = ({ isDarkMode, language }) => {
    const [loadingCompanies, setLoadingCompanies] = useState<boolean>(true);
    const [companiesData, setCompaniesData] = useState<{ formattedDates: string[], counts: number[] } | undefined>(undefined);

    useEffect(() => {
        const fetchCompaniesData = async () => {
            setLoadingCompanies(true); 
            const data = await getCompaniesByMonth();
            if (!data) {
                console.log({ message: "Error getting companies data" });
            } else {
                setCompaniesData(data);
            }
            setLoadingCompanies(false); 
        };
        fetchCompaniesData();
    }, []);

    // Si companiesData no está definido, se debe proporcionar valores por defecto
    const xDataExample: string[] = companiesData?.formattedDates ?? [];
    const yDataExample: number[] = companiesData?.counts ?? [];

    

    return (
        <>
            {loadingCompanies ? (
                <LinearLoader flag={true} />
            ) : (
                <>
                    <DashboardCardsContainer language={language} />
                    <BarChart 
                        xData={xDataExample} 
                        yData={yDataExample} 
                        darkMode={isDarkMode} 
                        title={language ? 'Compañias en los últimos meses' : 'Companies in the last months'} 
                    />
                </>
            )}
        </>
    );
};

export default SectionDashboard;

