"use client";
import React, { useEffect, useState } from "react";
import "./adminStyles.css";
import Header from "@/UI/components/molecules/Header";
export default function DashboardAdminView():React.ReactNode{
    
    return(
        <div className="content-layout">
            <Header />
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