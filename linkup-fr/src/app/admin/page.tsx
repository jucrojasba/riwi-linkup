"use client";
import { useLanguage } from "@/global-states/language-mode";
import { DashboardLayout } from "@/UI/components/organisms";
import { SectionCoders } from "@/UI/components/organisms";
import Route from "@/routes/route";
import { useState } from "react";
export default function AdminView(): React.ReactNode {
  const languages = useLanguage();
  const [render,setRender] = useState<boolean>(false);
  return (
    <Route>
      <DashboardLayout section={<SectionCoders render={render} />} titleView="Coders" subtitle="General Information" path="/admin" language={languages} setRender={setRender}/>
    </Route>
  );
}
