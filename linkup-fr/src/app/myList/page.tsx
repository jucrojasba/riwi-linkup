"use client";
import { useDarkMode } from "@/global-states/dark-mode";
import { useLanguage } from "@/global-states/language-mode";
import Route from "@/routes/route";
import { DashboardLayout } from "@/UI/components/organisms";
export default function MyList():React.ReactNode{
    const isDarkMode = useDarkMode((state) => state.DarkMode);
    const language = useLanguage((state) => state.language);
    return(
        <Route>
            <DashboardLayout section={<div>dasd</div>} language={language} isDarkMode={isDarkMode} titleView="MyList" subtitle="List of coders selected" />
        </Route>
    )
}