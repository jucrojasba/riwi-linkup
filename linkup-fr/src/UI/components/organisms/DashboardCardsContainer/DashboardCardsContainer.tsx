'use client';

import './DashboardCardsContainer.css'; // Import CSS styles for the component
import React, { useEffect, useState } from "react"; // Import React and hooks
import { useDarkMode } from "@/global-states/dark-mode"; // Import dark mode state
import DashboardCard from "@/UI/components/molecules/DashboardCard/DashboardCard"; // Import the DashboardCard component
import BarChartIcon from '@mui/icons-material/BarChart'; // Import icons from Material UI
import StorageIcon from '@mui/icons-material/Storage';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import { CircularLoader, LinearLoader } from '@/UI/components/atoms/loaders/Loaders'; // Import loader components
import { getCodersBackend, getCodersFrontend, getCodersInTraining } from '@/services/coderService'; // Import API service functions

// Define props for the DashboardCardsContainer component
interface IDashboardCardsContainerProps {
    language: boolean; // Language state (true for Spanish, false for English)
}

// Functional component for displaying dashboard cards
const DashboardCardsContainer: React.FC<IDashboardCardsContainerProps> = ({ language }) => {
    // Loading states for each API call
    const [loadingCodersTraining, setLoadingCodersTraining] = useState<boolean>(true);
    const [loadingCodersFrontend, setLoadingCodersFrontend] = useState<boolean>(true);
    const [loadingCodersBackend, setLoadingCodersBackend] = useState<boolean>(true);

    // State for tracking the number of coders in training
    const initialCodersTraining: number = 0;
    const [codersTraining, setCodersTraining] = useState<number>(initialCodersTraining);

    // Fetch coders in training on component mount
    useEffect(() => {
        const getCodersTraining = async () => {
            setLoadingCodersTraining(true); // Set loading state
            const codersTraining = await getCodersInTraining(); // Fetch data from API
            if (!codersTraining) {
                console.log({ message: "Error getting coders in training" });
            } else {
                setCodersTraining(codersTraining); // Update state with fetched data
            }
            setLoadingCodersTraining(false); // Reset loading state
        };
        getCodersTraining();
    }, []);

    // State for tracking the number of frontend coders
    const initialCodersFrontend: number = 0;
    const [codersFrontend, setCodersFrontend] = useState<number>(initialCodersFrontend);

    // Fetch frontend coders on component mount
    useEffect(() => {
        const getFrontend = async () => {
            setLoadingCodersFrontend(true); // Set loading state
            const codersFrontend = await getCodersFrontend(); // Fetch data from API
            if (!codersFrontend) {
                console.log({ message: "Error getting coders frontend" });
            } else {
                setCodersFrontend(codersFrontend); // Update state with fetched data
            }
            setLoadingCodersFrontend(false); // Reset loading state
        };
        getFrontend();
    }, []);

    // State for tracking the number of backend coders
    const initialCodersBackend: number = 0;
    const [codersBackend, setCodersBackend] = useState<number>(initialCodersBackend);

    // Fetch backend coders on component mount
    useEffect(() => {
        const getBackend = async () => {
            setLoadingCodersBackend(true); // Set loading state
            const codersBackend = await getCodersBackend(); // Fetch data from API
            if (!codersBackend) {
                console.log({ message: "Error getting coders Backend" });
            } else {
                setCodersBackend(codersBackend); // Update state with fetched data
            }
            setLoadingCodersBackend(false); // Reset loading state
        };
        getBackend();
    }, []);

    return (
        <div className="card-info-container">
            {/* Render dashboard cards or loaders based on loading state */}
            {loadingCodersTraining ? (
                <LinearLoader flag={true} /> // Show loader for training coders
            ) : (
                <DashboardCard 
                    icon={<BarChartIcon />} 
                    title={language ? 'Programadores' : 'Coders'} 
                    number={codersTraining} 
                    color='var(--red-color)' 
                />
            )}

            {loadingCodersFrontend ? (
                <LinearLoader flag={true} /> // Show loader for frontend coders
            ) : (
                <DashboardCard 
                    icon={<CodeOffIcon style={{ transform: 'scaleX(-1)', display: 'inline-block' }} />} 
                    title={language ? 'Desarrolladores Front' : 'Dev Front'} 
                    number={codersFrontend} 
                    color='var(--green-color)' 
                />
            )}

            {loadingCodersBackend ? (
                <LinearLoader flag={true} /> // Show loader for backend coders
            ) : (
                <DashboardCard 
                    icon={<StorageIcon />} 
                    title={language ? 'Desarrolladores Back' : 'Dev Back'}  
                    number={codersBackend} 
                    color='var(--main-color)' 
                />
            )}
        </div>
    );
};

export default DashboardCardsContainer;
