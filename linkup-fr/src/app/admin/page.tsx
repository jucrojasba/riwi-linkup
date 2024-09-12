"use client";
import "./adminGlobalStyles.css";
import { DashboardLayout } from "@/UI/components/organisms";
export default function AdminView(): React.ReactNode {
  return (
    <div className="content-layout">
      <DashboardLayout /> 
      <main className="main">ds</main>
    </div>
  );
}
