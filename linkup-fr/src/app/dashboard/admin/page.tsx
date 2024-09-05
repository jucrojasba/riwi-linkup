"use client";
import React, { useEffect, useState } from "react";
import "./adminStyles.css";
import Header from "@/UI/components/molecules/Header";
import TitleMain from "@/UI/components/atoms/TitleMain";
import Search from "@/UI/components/molecules/Search/Search";
import Filter from "@/UI/components/molecules/Filter/Filter";
export default function DashboardAdminView():React.ReactNode{
    
    return(
        <div className="content-layout">
            <Header />
            <div>
                <main className="main">
                    <section className="main-section">
                        <div className="section-content-coders">
                            <TitleMain 
                            className="content-coders-title"
                            title="Coders"
                            subtitle="General Information"
                            />
                            <div>LanguageSwitcher</div>
                            <Search />
                        </div>
                        <div className="section-content-filters">
                            <TitleMain 
                            className="content-filters-title"
                            title="Filters"
                            />
                            <Filter />
                        </div>
                    </section>
                </main>
                <footer className="footer">
                    footer
                </footer>
            </div>
        </div>
    )
}