'use client'; // Indicates that this component will use client-side rendering

import { getCompaniesByMonth } from "@/services/clientServices"; // Importing the service to fetch company data
import BarChart from "../../atoms/BarChart/BarChart"; // Importing a BarChart component
import DashboardCardsContainer from "../DashboardCardsContainer/DashboardCardsContainer"; // Importing a container for dashboard cards
import { useEffect, useState } from "react"; // React hooks for state management and side effects
import { LinearLoader } from "../../atoms"; // Importing a loading spinner
import ChatBot from "../../atoms/ChatBot/ChatBot"; // Importing a chatbot component

// Interface defining the props expected by the SectionDashboard component
interface ISectionDashboard {
    isDarkMode: boolean; // Determines if dark mode is enabled
    language: boolean; // Language setting (true for one language, false for another)
}

// Functional component definition
const SectionDashboard: React.FC<ISectionDashboard> = ({ isDarkMode, language }) => {
    const [loadingCompanies, setLoadingCompanies] = useState<boolean>(true); // State for loading status
    const [companiesData, setCompaniesData] = useState<{ formattedDates: string[], counts: number[] } | undefined>(undefined); // State for company data

    // useEffect to fetch company data when the component mounts
    useEffect(() => {
        const fetchCompaniesData = async () => {
            setLoadingCompanies(true); // Set loading to true
            const data = await getCompaniesByMonth(); // Fetch the data
            if (!data) {
                console.log({ message: "Error getting companies data" }); // Handle error
            } else {
                setCompaniesData(data); // Update state with fetched data
            }
            setLoadingCompanies(false); // Set loading to false
        };
        fetchCompaniesData(); // Call the fetch function
    }, []); // Empty dependency array means this runs once when the component mounts

    // Provide default values if companiesData is not defined
    const xDataExample: string[] = companiesData?.formattedDates ?? []; // Dates for the x-axis
    const yDataExample: number[] = companiesData?.counts ?? []; // Counts for the y-axis

    return (
        <>
            {loadingCompanies ? ( // If loading, show loader
                <LinearLoader flag={true} />
            ) : (
                <>
                    <DashboardCardsContainer language={language} /> {/* Render the dashboard cards */}
                    <BarChart 
                        xData={xDataExample} 
                        yData={yDataExample} 
                        darkMode={isDarkMode} 
                        title={language ? 'Compañias en los últimos meses' : 'Companies in the last months'} // Title based on language
                    />
                    <ChatBot 
                        botImage='./icons/logoR.svg' 
                        userImage='./images/womanImage.png' 
                        isDarkMode={isDarkMode} 
                        language={language} 
                    /> {/* Render the chatbot */}
                </>
            )}
        </>
    );
};

export default SectionDashboard; // Export the component
