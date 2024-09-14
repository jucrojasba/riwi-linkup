'use client'
import "./loginStyles.css";
import { LogInForm } from "@/UI/components/molecules";
import NavbarHome from "@/UI/components/molecules/NavbarHome/NavbarHome";
import Image from "next/image";
export default function LoginView(): JSX.Element{
    return(
        <main className="main">
            <NavbarHome isDarkMode={false}/>
            <section className="main-section">
                <div className="section-image">
                    <img src="/images/coderLogin01.png" alt="" />
                </div>
                <LogInForm />
            </section>
        </main>
    );
}