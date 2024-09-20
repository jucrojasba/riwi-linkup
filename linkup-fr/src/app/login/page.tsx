'use client'
import "./loginStyles.css";
import { LogInForm, NavbarHome, UtilityRightButtons } from "@/UI/components/molecules";
import { AuthLayout } from "@/UI/components/organisms";
import { useDarkMode } from "@/global-states/dark-mode";
import Image from "next/image";
import Route from "@/routes/route";
import { useLanguage } from "@/global-states/language-mode";



export default function LoginView(): JSX.Element {
    const DarkMode = useDarkMode((state) => state.DarkMode);
    const language =useLanguage((state)=>state.language);
    
    return (
        <Route>
            <main className="mainLogin">
            <UtilityRightButtons responsive={true} isDarkMode={DarkMode} />
            <AuthLayout isDarkMode={DarkMode} language={language}/>
                <section className={DarkMode ? "dark-mode" : "mainLogin-section"}>
                    <div className="section-image">
                        <Image className="image" src={"/images/test.png"} alt="coderLogin" width={400} height={400} />
                    </div>
                    <LogInForm />
                </section>
            </main>
        </Route>
    );
}
