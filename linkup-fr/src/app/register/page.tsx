"use client";
import "./registerStyles.css";
import { NavbarHome, RegisterForm } from "@/UI/components/molecules";

export default function RegisterView(): JSX.Element{
    return(
        <main className="main">
            <NavbarHome isDarkMode={false}/>
            <section className="main-section">
                <div className="section-image">
                    <img src="/images/coderRegister01.png" alt="coderRegister-coders" />
                </div>
                <RegisterForm />
            </section>
        </main>
    )
}