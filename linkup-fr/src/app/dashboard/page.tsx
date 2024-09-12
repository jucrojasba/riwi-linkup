'use client'

import './dashboardStyle.css'
import { useDarkMode } from "@/global-states/dark-mode";
import DashboardCardsContainer from '@/UI/components/organisms/DashboardCardsContainer/DashboardCardsContainer';

export default function DashboardView(){
    // Logic
    const DarkMode = useDarkMode((state) => state.DarkMode);

    return (
        <main>
            <div className="dashboard-wrapper">
               <DashboardCardsContainer/>
            </div>
        </main>
    );
}
