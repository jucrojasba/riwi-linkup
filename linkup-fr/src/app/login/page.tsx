'use client'
<<<<<<< HEAD
=======

>>>>>>> e1c1793a35d15f98f35656b05ce55ad94ca3d963
import "./loginStyles.css";
import { LogInForm } from "@/UI/components/molecules";
import NavbarHome from "@/UI/components/molecules/NavbarHome";
import Image from "next/image";
export default function LoginView(): JSX.Element{
    return(
        <main className="main">
            <NavbarHome/>
            <section className="main-section">
                <div className="section-image">
                    <Image className="image" src={"/images/test.png"} alt="coderLogin" width={100} height={100} />
                </div>
                <LogInForm />
            </section>
        </main>
    );
}