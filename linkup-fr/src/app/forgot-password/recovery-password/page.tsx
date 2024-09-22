"use client";
import "./recoveryPasswordStyles.css";
import Route from "@/routes/route";
import { AuthLayout, DashboardCardsContainer } from "@/UI/components/organisms";
import { useLanguage } from "@/global-states/language-mode";
import { UtilityRightButtons } from "@/UI/components/molecules";
import { RiwiLogo } from "@/UI/components/atoms";
import RecoveryPasswordForm from "@/UI/components/molecules/RecoveryPassword/RecoveryPassword";
import { useDarkMode } from "@/global-states/dark-mode";
import Image from "next/image";

export default function RecoveryPasswordView() {
    const language = useLanguage((state) => state.language);
    const DarkMode = useDarkMode((state)=>state.DarkMode);
    return (
        <Route>
            <main className="main-recovery">
                <UtilityRightButtons responsive={true} isDarkMode={DarkMode} />
                <RiwiLogo isDarkMode={DarkMode} responsive={true}/>
                <AuthLayout isDarkMode={DarkMode} language={language}/>
                <section className={DarkMode ? "dark-mode" : "recovery-password-section"}>
                    <RecoveryPasswordForm />
                </section>
            </main>
        </Route>
    )
}
