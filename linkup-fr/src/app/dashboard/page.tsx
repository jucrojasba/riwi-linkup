'use client'

import { useLanguage } from '@/global-states/language-mode';
import './dashboardStyle.css'
import { useDarkMode } from "@/global-states/dark-mode";
import { DashboardLayout } from '@/UI/components/organisms';
import DashboardCardsContainer from '@/UI/components/organisms/DashboardCardsContainer/DashboardCardsContainer';
import SectionDashboard from '@/UI/components/organisms/SectionDashboard/SectionDashboard';

export default function DashboardView(){
    // Logic
    const DarkMode = useDarkMode((state) => state.DarkMode);
    const language=useLanguage((state) => state.language);

    return (
        <main>
            <DashboardLayout section={<SectionDashboard isDarkMode={DarkMode} language={language}/>} language={language}/>
        </main>
    );
}
