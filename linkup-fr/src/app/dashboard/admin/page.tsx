"use client";
import React, { useEffect, useState } from "react";
import "./adminStyles.css";
import Header from "@/UI/components/molecules/Header";
import TitleMain from "@/UI/components/atoms/TitleMain";
import Search from "@/UI/components/molecules/Search/Search";
import Filter from "@/UI/components/molecules/Filter/Filter";
import Card from "@/UI/components/molecules/Card/Card";
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
                        <div className="section-content-cards">
                            <Card
                            url_image="https://http2.mlstatic.com/D_Q_NP_2X_683319-MCO72329447420_102023-E.webp"
                            alt_image=""
                            name_user=""
                            age_user=""
                            />
                            <Card
                            url_image="https://http2.mlstatic.com/D_Q_NP_2X_683319-MCO72329447420_102023-E.webp"
                            alt_image=""
                            name_user=""
                            age_user=""
                            />
                            <Card
                            url_image="https://http2.mlstatic.com/D_Q_NP_2X_683319-MCO72329447420_102023-E.webp"
                            alt_image=""
                            name_user=""
                            age_user=""
                            />
                            <Card
                            url_image="https://http2.mlstatic.com/D_Q_NP_2X_683319-MCO72329447420_102023-E.webp"
                            alt_image=""
                            name_user=""
                            age_user=""
                            />
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