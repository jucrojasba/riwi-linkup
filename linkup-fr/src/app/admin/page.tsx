"use client";
import { useLanguage } from "@/global-states/language-mode";
import { DashboardLayout } from "@/UI/components/organisms";
import { SectionCoders } from "@/UI/components/organisms";
import Route from "@/routes/route";
export default function AdminView(): React.ReactNode {
  const languages = useLanguage();
  return (
    <Route>
      <DashboardLayout section={<SectionCoders />} titleView="Coders" subtitle="General Information" path="/admin" language={languages}/>
    </Route>
  );
}
