"use client";
import { useDarkMode } from "@/global-states/dark-mode";
import { useLanguage } from "@/global-states/language-mode";
import { DashboardLayout, SectionCoderOnly } from "@/UI/components/organisms";
import Route from "@/routes/route";

export default function CoderView(): React.ReactNode {
  const language = useLanguage();
  const DarkMode = useDarkMode((state) => state.DarkMode);

  return(
    <Route>
      <DashboardLayout section={<SectionCoderOnly />} titleView="Coder" subtitle="Information" path="/coder" language={language} isDarkMode={DarkMode}/>;
    </Route>
  )
}
