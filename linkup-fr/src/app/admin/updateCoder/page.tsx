"use client";
import { useDarkMode } from "@/global-states/dark-mode";
import { useLanguage } from "@/global-states/language-mode";
import Route from "@/routes/route"
import { DashboardLayout } from "@/UI/components/organisms";
import SectionUpateCoder from "@/UI/components/organisms/SectionUpdateCoder/SectionUpdateCoder";

export default function UpdateCoderView():React.ReactNode{
    const language = useLanguage((state) =>state.language);
    const isDarkMode = useDarkMode((state) => state.DarkMode)
    return (
        <Route>
            <DashboardLayout section={<SectionUpateCoder />} language={language} titleView="Update" subtitle="Update coder" isDarkMode={isDarkMode} />
        </Route>
    )
}