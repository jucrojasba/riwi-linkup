"use client";
import { CircularLoader } from "@/UI/components/atoms";
import { DashboardLayout } from "@/UI/components/organisms";
import SectionCoderOnly from "@/UI/components/organisms/sectionCoderOnly/sectionCoderOnly";
import { useLanguage } from "@/global-states/language-mode";
export default function CoderView(): React.ReactNode {
  const language = useLanguage();
  const path = window.location.pathname;
  console.log(path);
  return (
    <DashboardLayout
      section={<SectionCoderOnly />}
      titleView="Coder"
      subtitle="Information"
      path={path}
      language={language}
    />
  );
}
