"use client";
import { DashboardLayout } from "@/UI/components/organisms";
import { SectionCoders } from "@/UI/components/organisms";
export default function AdminView(): React.ReactNode {
  return <DashboardLayout section={<SectionCoders />} titleView="Coders" subtitle="General Information" path="" />;
}
