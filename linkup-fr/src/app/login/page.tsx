'use client'
import "./loginStyles.css";
import { LogInForm, NavbarHome } from "@/UI/components/molecules";
import { AuthLayout } from "@/UI/components/organisms";
import { useDarkMode } from "@/global-states/dark-mode";
import Image from "next/image";

export default function LoginView(): React.ReactNode{
    const DarkMode = useDarkMode((state) => state.DarkMode);
    return(
        <main className={DarkMode ? "dark-mode" : "mainLogin"}>
            <AuthLayout isDarkMode={DarkMode} />
            <NavbarHome isDarkMode={false}/>
            <section className="mainLogin-section">
                <div className="section-image">
                    <img src="/images/coderLogin01.png" alt="coderLogin - woman" />
                </div>
                <LogInForm />
            </section>
        </main>
    );
}