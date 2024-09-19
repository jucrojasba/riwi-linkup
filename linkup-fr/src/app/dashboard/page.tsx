'use client';
import { useLanguage } from '@/global-states/language-mode';
import './dashboardStyle.css'
import { useDarkMode } from "@/global-states/dark-mode";
import { DashboardLayout } from '@/UI/components/organisms';
import SectionDashboard from '@/UI/components/organisms/SectionDashboard/SectionDashboard';
import { useAuthUser } from '@/global-states/authUser';
import Route from '@/routes/route';


export default function DashboardView(){
    // Logic
    const DarkMode = useDarkMode((state) => state.DarkMode);
    const language=useLanguage((state) => state.language);
    const titleView = language? "Tablero":"Dashboard";
    const subtitle= language? "Estadisticas Globales":"General Stats";

    return (
        <Route>
            <main>
                <DashboardLayout section={<SectionDashboard isDarkMode={DarkMode} language={language}/>} language={language} titleView={titleView} subtitle={subtitle} path="/dashboard" isDarkMode={DarkMode}/>
            </main>
        </Route>
    );
}
