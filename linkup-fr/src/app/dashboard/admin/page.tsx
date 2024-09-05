"use client";
import React, { useEffect, useState } from "react";
import "./adminStyles.css";
import Image from "next/image";
import Link from "next/link";
export default function DashboardAdminView():React.ReactNode{
    const navDataIcons = [
        {name: "Dashboard", src: "/icons/dashboardIcon.svg", href: ""},
        {name: "Coders", src: "/icons/coderIcon.svg", href: ""},
        {name: "Config", src: "/icons/configIcon.svg", href: ""},
    ]
    return(
        <div className="content-layout">
            <header className="header">
                <h2 className="header-title">Riwi-LinkUp</h2>
                <div className="header-content-user">
                    <div className="content-user-image">
                        <Image className="image" src={"/images/imageDefault.jpg"} alt="" width={100} height={100} />
                    </div>
                    <h5 className="content-user-welcome">Welcome back.</h5>
                    <h3 className="content-user-name">Riwi</h3>
                </div>
                <nav className="header-nav">
                    <ul className="header-nav-list">
                        <div>
                            {navDataIcons.map((icon)=> (
                                <li className="nav-list-item">
                                <Image 
                                className="list-item-image" 
                                src={icon.src} 
                                alt={icon.name}
                                width={100} 
                                height={100} 
                                />
                                <Link className="list-item-link" href={icon.href}>{icon.name}</Link>
                                </li>
                            ))}
                        </div>
                        <li className="nav-list-item">
                            <Image 
                            className="list-item-image" 
                            src={"/icons/logOutIcon.svg"} 
                            alt="log out Icon" 
                            width={100} 
                            height={100} 
                            />
                            <Link className="list-item-link" href="">Log out</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <div>
                <main className="main">
                    main
                </main>
                <footer className="footer">
                    footer
                </footer>
            </div>
        </div>
    )
}