"use client";
import React, { useEffect, useState } from "react";
import "./adminStyles.css";
import Image from "next/image";
import Link from "next/link";
import { Password } from "@mui/icons-material";
import IUser from "@/UI/interfaces/IUserInterface";
export default function DashboardAdminView():React.ReactNode{
    const userInitial:IUser = {
        name: "",
        email: "",
        isConfirmed: false,
        password: "",
        phone: "",
    }
    const [users,setUsers] = useState(userInitial);

    useEffect(()=>{
        
    })
    return(
        <div className="content-layout">
            <header className="header">
                <h2 className="header-title">Riwi-LinkUp</h2>
                <div className="header-content-user">
                    <div className="content-user-image">
                        <Image className="image" src="" alt="" width={100} height={100} />
                    </div>
                    <h5 className="content-user-welcome">Welcome back.</h5>
                    <h3 className="content-user-name">Riwi</h3>
                </div>
                <nav className="header-nav">
                    <ul className="header-nav-list">
                        <div>
                            <li className="nav-list-item">
                                <Image className="list-item-image" src="" alt="" width={100} height={100} />
                                <Link className="list-item-link" href="">Dashboard</Link>
                            </li>
                        </div>
                        <li className="nav-list-item">
                            <Image className="list-item-image" src="" alt="" width={100} height={100} />
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