"use client";
import "./adminGlobalStyles.css";
import { DashboardLayout } from "@/UI/components/organisms";
import { SectionCoders } from "@/UI/components/organisms";
export default function AdminView(): React.ReactNode {
  return (
    <div className="content-layout">
      <DashboardLayout section={<SectionCoders />} />
    </div>
  );
}
