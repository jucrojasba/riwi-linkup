'use client'

import './dashboardStyle.css'
import React, { useEffect, useState } from "react";
import { useDarkMode } from "@/global-states/dark-mode";
import DashboardCard from "@/UI/components/molecules/DashboardCard/DashboardCard";
import BarChartIcon from '@mui/icons-material/BarChart';
import StorageIcon from '@mui/icons-material/Storage';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import { CircularLoader, LinearLoader } from '@/UI/components/atoms/loaders/Loaders';
import { getCodersBackend, getCodersFrontend, getCodersInTraining } from '@/services/coderService';

export default function DashboardView(){
    // Logic
    const DarkMode = useDarkMode((state) => state.DarkMode);

    // Estado de carga para cada API
    const [loadingCodersTraining, setLoadingCodersTraining] = useState<boolean>(true);
    const [loadingCodersFrontend, setLoadingCodersFrontend] = useState<boolean>(true);
    const [loadingCodersBackend, setLoadingCodersBackend] = useState<boolean>(true);

    // Get Coders in Training
    const initialCodersTraining: number = 0;
    const [codersTraining, setCodersTraining] = useState<number>(initialCodersTraining);

    useEffect(() => {
        const getCodersTraining = async () => {
            setLoadingCodersTraining(true); 
            const codersTraining = await getCodersInTraining();
            if (!codersTraining) {
                console.log({ message: "Error getting coders in training" });
            } else {
                setCodersTraining(codersTraining);
            }
            setLoadingCodersTraining(false); 
        };
        getCodersTraining();
    }, []);

    // Get Coders Frontend
    const initialCodersFrontend: number = 0;
    const [codersFrontend, setCodersFrontend] = useState<number>(initialCodersFrontend);

    useEffect(() => {
        const getFrontend = async () => {
            setLoadingCodersFrontend(true); 
            const codersFrontend = await getCodersFrontend();
            if (!codersFrontend) {
                console.log({ message: "Error getting coders frontend" });
            } else {
                setCodersFrontend(codersFrontend);
            }
            setLoadingCodersFrontend(false); 
        };
        getFrontend();
    }, []);

    // Get Coders Backend
    const initialCodersBackend: number = 0;
    const [codersBackend, setCodersBackend] = useState<number>(initialCodersBackend);

    useEffect(() => {
        const getBackend = async () => {
            setLoadingCodersBackend(true); 
            const codersBackend = await getCodersBackend();
            if (!codersBackend) {
                console.log({ message: "Error getting coders Backend" });
            } else {
                setCodersBackend(codersBackend);
            }
            setLoadingCodersBackend(false); 
        };
        getBackend();
    }, []);

    return (
        <main>
            <div className="dashboard-wrapper">
                <div className="card-info-container">
                    {loadingCodersTraining ? (
                        <>
                            <CircularLoader flag={true}/>
                            <LinearLoader flag={true}/> 
                        </>
                    ) : (
                        <DashboardCard 
                            icon={<BarChartIcon />} 
                            title='Quantity Coders' 
                            number={codersTraining} 
                            color='var(--red-color)' 
                        />
                    )}
                    
                    {loadingCodersFrontend ? (
                        <>
                            <CircularLoader flag={true}/>
                            <LinearLoader flag={true}/> 
                        </>
                    ) : (
                        <DashboardCard 
                            icon={<CodeOffIcon style={{ transform: 'scaleX(-1)', display: 'inline-block' }} />} 
                            title='Front Technologies' 
                            number={codersFrontend} 
                            color='var(--green-color)' 
                        />
                    )}
                    
                    {loadingCodersBackend ? (
                        <>
                            <CircularLoader flag={true}/>
                            <LinearLoader flag={true}/> 
                        </>
                    ) : (
                        <DashboardCard 
                        icon={<StorageIcon />} 
                        title='Backend Technologies' 
                        number={codersBackend} 
                        color='var(--main-color)' 
                    />
                    )}
                    
                </div>
            </div>
        </main>
    );
}
