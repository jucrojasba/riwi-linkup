'use client'

import './dashboardStyle.css'
import React, { useEffect, useState } from "react";
import { useDarkMode } from "@/global-states/dark-mode";
import DashboardCard from "@/UI/components/molecules/DashboardCard/DashboardCard";
import BarChartIcon from '@mui/icons-material/BarChart';
import StorageIcon from '@mui/icons-material/Storage';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import { getCodersInTraining } from '@/services/coderService';

export default function DashboardView(){
    //Logic
    const DarkMode = useDarkMode((state) => state.DarkMode);
    const initialCodersTraining:number=0;
    const [codersTraining, setCodersTraining] = useState<number>(initialCodersTraining);

    useEffect(()=>{
        const getCodersTraining = async() =>{
            const codersTraining = await getCodersInTraining();
            if(!codersTraining){
                console.log({message: "Error get users"});
                return;
            }
            setCodersTraining(codersTraining);
        }
        getCodersTraining();
    }, []);
    console.log(codersTraining);

    return (
        <main>
            <div className="dashboard-wrapper">
                <div className="card-info-container">
                <DashboardCard icon={<BarChartIcon/>} title='Quantity Coders' number={codersTraining} color='var(--red-color)'/>
                <DashboardCard icon={<CodeOffIcon style={{ transform: 'scaleX(-1)', display: 'inline-block' }} />} title='Front Technologies' number={150} color='var(--green-color)'/>
                <DashboardCard icon={<StorageIcon/>} title='Backend Technologies' number={150} color='var(--main-color)'/>
                </div>
            </div>
        </main>
    )
}