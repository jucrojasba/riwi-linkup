"use client";
import { useLanguage } from "@/global-states/language-mode";
import { DashboardLayout } from "@/UI/components/organisms";
import { SectionCoders } from "@/UI/components/organisms";
import Route from "@/routes/route";
import { useDarkMode } from "@/global-states/dark-mode";
export default function AdminView(): React.ReactNode {
  const languages = useLanguage();
  const DarkMode = useDarkMode((state) => state.DarkMode);
  return (
    <Route>
      <DashboardLayout section={<SectionCoders />} titleView="Coders" subtitle="General Information" path="/admin" language={languages} isDarkMode={DarkMode}/>
    </Route>
  );
}
