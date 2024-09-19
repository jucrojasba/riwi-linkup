"use client";
import "./registerStyles.css";
import { NavbarHome, RegisterForm } from "@/UI/components/molecules";
import { AuthLayout } from "@/UI/components/organisms";
import { useDarkMode } from "@/global-states/dark-mode";
import Route from "@/routes/route";
import Image from "next/image";

export default function RegisterView(): JSX.Element{
    const DarkMode = useDarkMode((state) => state.DarkMode);

    return(
        <Route>
            <main className="mainRegister">
                <AuthLayout isDarkMode={DarkMode} />
                <section className={DarkMode ? "dark-mode" : "mainRegister-section"}>
                    <div className="section-image">
                        <Image className="image" src={"/images/coderRegister01.png"} alt="coderRegister-coders" width={600} height={600} />
                    </div>
                    <RegisterForm />
                </section>
            </main>
        </Route>
    )
}