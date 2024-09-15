"use client";
import { useLanguage } from "@/global-states/language-mode";
import { CircularLoader } from "@/UI/components/atoms";
import { DashboardLayout } from "@/UI/components/organisms";
export default function CoderView(): React.ReactNode {
  const language = useLanguage();
  return <DashboardLayout section={<div>dasd</div>} titleView="Coder" subtitle="Information" path="/coder" language={language}/>;
}
