"use client";
import { useLanguage } from "@/global-states/language-mode";
import "./adminGlobalStyles.css";
import { DashboardLayout } from "@/UI/components/organisms";
import { SectionCoders } from "@/UI/components/organisms";
export default function AdminView(): React.ReactNode {
  const languages = useLanguage();
  return (
    <div className="content-layout">
      <DashboardLayout section={<SectionCoders />} language={languages}/>
    </div>
  );
}
