"use client";
import { useLanguage } from "@/global-states/language-mode";
import { DashboardLayout } from "@/UI/components/organisms";
import { SectionCoders } from "@/UI/components/organisms";
import Route from "@/routes/route";
import { useState } from "react";
import { useDarkMode } from "@/global-states/dark-mode";

export default function AdminView(): React.ReactNode {
  const languages = useLanguage((state)=>state.language);
  const [render,setRender] = useState<boolean>(false);
  const DarkMode = useDarkMode(state => state.DarkMode);
  const language = useLanguage((state)=>state.language);

  return (
    <Route>
      <DashboardLayout isDarkMode={DarkMode} section={<SectionCoders render={render} setRender={setRender} isDarkMode={DarkMode} />} titleView={language?"Desarrolladores":"Coders"} subtitle={language?'Descubre talento':'Discover talent'} language={languages}/>
    </Route>
  );
}
