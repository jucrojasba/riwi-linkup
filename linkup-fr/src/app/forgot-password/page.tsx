"use client";
import "./forgotPasswordStyles.css";
import Route from "@/routes/route";
import { AuthLayout, DashboardCardsContainer } from "@/UI/components/organisms";
import { useLanguage } from "@/global-states/language-mode";
import { UtilityRightButtons } from "@/UI/components/molecules";
import { RiwiLogo } from "@/UI/components/atoms";
import ForgotPasswordForm from "@/UI/components/molecules/ForgotPasswordForm/ForgotPasswordForm";
import { useDarkMode } from "@/global-states/dark-mode";
import Image from "next/image";

export default function ForgotPasswordView() {
    const language = useLanguage((state) => state.language);
    const DarkMode = useDarkMode((state)=>state.DarkMode);
    return (
        <Route>
            <main className="main-forgot">
            <UtilityRightButtons responsive={true} isDarkMode={DarkMode} />
            <RiwiLogo isDarkMode={DarkMode} responsive={true}/>
            <AuthLayout isDarkMode={DarkMode} language={language}/>
                <section className={DarkMode ? "dark-mode" : "forgot-password-section"}>
                    {/* <div className="section-image">
                        <Image className="image" src={"/images/test.png"} alt="coderLogin" width={400} height={400} />
                    </div> */}
                    <ForgotPasswordForm />
                </section>
            </main>
        </Route>
    )
}