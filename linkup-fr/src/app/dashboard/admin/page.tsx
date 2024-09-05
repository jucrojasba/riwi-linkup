"use client";
import React, { useEffect, useState } from "react";
import "./adminStyles.css";
import Header from "@/UI/components/molecules/Header";
import TitleMain from "@/UI/components/atoms/TitleMain";
import Search from "@/UI/components/molecules/Search/Search";
import Filter from "@/UI/components/molecules/Filter/Filter";
import Card from "@/UI/components/molecules/Card/Card";
import { ICoder,ICoders } from "@/UI/interfaces/ICoderInterface";
import { getCodersService } from "@/services/coderService";
import calculateAge from "@/utilities/calculateAge";
export default function DashboardAdminView():React.ReactNode{
    const initialCoder:ICoder = {
        id: 0,
        url_image: "",
        name: "",
        birthday: ""
    }
    const initialCoders:ICoders = {
        coders: [initialCoder]
    }
    const [coders, setCoders] = useState<ICoders>(initialCoders); // Agregar los coders

    useEffect(()=>{
        const getCoders = async() =>{
            const coders = await getCodersService();
            if(!coders){
                console.log({message: "Error get users"});
                return;
            }
            setCoders({coders});
        }
        getCoders();
    }, []);
    
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
                            {coders.coders.length > 0
                            ? coders.coders.map((coder:ICoder)=>(
                                <Card
                                id_coder={coder.id}
                                key={coder.name}
                                url_image={coder.url_image ? coder.url_image : "https://ehs.stanford.edu/wp-content/uploads/missing-image.png"}
                                alt_image={`coder-${coder.name} image`}
                                name_user={coder.name}
                                age_user={`${calculateAge(coder.birthday)} years`}
                                />
                            ))
                            :<p>There are not coders...</p>}
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