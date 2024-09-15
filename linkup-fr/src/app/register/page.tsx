"use client";
import "./registerStyles.css";
import { NavbarHome, RegisterForm } from "@/UI/components/molecules";

export default function RegisterView(): JSX.Element{
    return(
        <main className="mainRegister">
            <NavbarHome isDarkMode={false}/>
            <section className="mainRegister-section">
                <div className="section-image">
                    <img src="/images/coderRegister01.png" alt="coderRegister-coders" />
                </div>
                <RegisterForm />
            </section>
        </main>
    )
}