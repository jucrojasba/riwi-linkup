'use client'

import './dashboardStyle.css'
import { useDarkMode } from "@/global-states/dark-mode";
import DashboardCard from "@/UI/components/molecules/DashboardCard/DashboardCard";
import BarChartIcon from '@mui/icons-material/BarChart';
import StorageIcon from '@mui/icons-material/Storage';
import CodeOffIcon from '@mui/icons-material/CodeOff';

export default function DashboardView(){
    //Logic
    const DarkMode = useDarkMode((state) => state.DarkMode);

    return (
        <main>
            <div className="dashboard-wrapper">
                <div className="card-info-container">
                <DashboardCard icon={<BarChartIcon/>} title='Quantity Coders' number={150} color='var(--red-color)'/>
                <DashboardCard icon={<CodeOffIcon style={{ transform: 'scaleX(-1)', display: 'inline-block' }} />} title='Front Technologies' number={150} color='var(--green-color)'/>
                <DashboardCard icon={<StorageIcon/>} title='Backend Technologies' number={150} color='var(--main-color)'/>
                </div>
            </div>
        </main>
    )
}