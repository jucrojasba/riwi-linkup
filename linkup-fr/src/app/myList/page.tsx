"use client";
import { useDarkMode } from "@/global-states/dark-mode";
import { useLanguage } from "@/global-states/language-mode";
import Route from "@/routes/route";
import { DashboardLayout } from "@/UI/components/organisms";
import SectionMyList from "@/UI/components/organisms/SectionMyList/SectionMyList";
import { useState } from "react";
export default function MyList():React.ReactNode{
    const language = useLanguage((state)=>state.language);
    const [render,setRender] = useState<boolean>(false);
    const DarkMode = useDarkMode(state => state.DarkMode);
    return(
        <Route>
            <DashboardLayout section={<SectionMyList render={render} setRender={setRender} isDarkMode={DarkMode}/>} language={language} isDarkMode={DarkMode} titleView={language?'Mi Lista':"My List"} subtitle={language?'Lista de desarroladores seleccionados':"List of coders selected"} />
        </Route>
    )
}