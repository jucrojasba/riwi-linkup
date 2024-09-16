"use client";
import "./registerStyles.css";
import { NavbarHome, RegisterForm } from "@/UI/components/molecules";
import Route from "@/routes/route";

export default function RegisterView(): JSX.Element{
    return(
        <Route>
            <main className="mainRegister">
                <NavbarHome isDarkMode={false}/>
                <section className="mainRegister-section">
                    <div className="section-image">
                        <img src="/images/coderRegister01.png" alt="coderRegister-coders" />
                    </div>
                    <RegisterForm />
                </section>
            </main>
        </Route>
    )
}