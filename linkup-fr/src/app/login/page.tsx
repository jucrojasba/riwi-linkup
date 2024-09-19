'use client'
import "./loginStyles.css";
import { LogInForm, NavbarHome } from "@/UI/components/molecules";
import { AuthLayout } from "@/UI/components/organisms";
import { useDarkMode } from "@/global-states/dark-mode";
import Image from "next/image";
import Route from "@/routes/route";



export default function LoginView(): JSX.Element {
    const DarkMode = useDarkMode((state) => state.DarkMode);
    
    return (
        <Route>
            <main className="mainLogin">
                <AuthLayout isDarkMode={DarkMode} />
                <section className={DarkMode ? "dark-mode" : "mainLogin-section"}>
                    <div className="section-image">
                        <Image className="image" src={"/images/test.png"} alt="coderLogin" width={600} height={600} />
                    </div>
                    <LogInForm />
                </section>
            </main>
        </Route>
    );
}
