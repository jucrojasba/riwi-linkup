"use client";
import { CircularLoader } from "@/UI/components/atoms";
import { DashboardLayout } from "@/UI/components/organisms";
export default function CoderView(): React.ReactNode {
  const path = window.location.pathname;
  console.log(path)
  return <DashboardLayout section={<div>dasd</div>} titleView="Coder" subtitle="Information" path={path} />;
}
