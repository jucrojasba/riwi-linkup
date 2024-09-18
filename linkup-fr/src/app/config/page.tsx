'use client';
import { useLanguage } from '@/global-states/language-mode';
import { useDarkMode } from "@/global-states/dark-mode";
import { DashboardLayout } from '@/UI/components/organisms';
import SectionProfile from '@/UI/components/organisms/SectionProfile/SectionProfile';
import { useAuthUser } from '@/global-states/authUser';
import Route from '@/routes/route';


export default function DashboardView(){
    // Logic
    const DarkMode = useDarkMode((state) => state.DarkMode);
    const language=useLanguage((state) => state.language);
    const titleView = language? "Mi Perfil":"My Profile";
    const subtitle= language? "Información Personal":"Personal Information";
    const AuthUser = useAuthUser((state)=> state.authUser);

    return (
        <Route>
            <main>
                <DashboardLayout section={<SectionProfile isDarkMode={DarkMode} language={language}/>} language={language} titleView={titleView} subtitle={subtitle} path="/config" isDarkMode={DarkMode}/>
            </main>
        </Route>
    );
};