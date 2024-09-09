"use client";
import "./adminStyles.css";
import "./adminStylesAdaptable.css";
import React, { useEffect, useState } from "react";
import Header from "@/UI/components/molecules/Header";
import TitleMain from "@/UI/components/atoms/TitleMain";
import Search from "@/UI/components/molecules/Search/Search";
import Filter from "@/UI/components/molecules/Filter/Filter";
import Card from "@/UI/components/molecules/Card/Card";
import { ICoder,ICoders } from "@/UI/interfaces/ICoderInterface";
import { getCodersService } from "@/services/coderService";
import calculateAge from "@/utilities/calculateAge";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import LanguageSelector from "@/UI/components/molecules/SwitchLanguage/SwitchLanguage";
import Link from "next/link";
export default function DashboardAdminView():React.ReactNode{
    const [expand,setExpand] = useState<boolean>(false);
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
    console.log(coders);

    const handleButtonExpand = () =>{
        setExpand(!expand);
        console.log("do something");
    }
    return(
        <div className="content-layout">
            
            <div className="open" onClick={handleButtonExpand}>
                <KeyboardArrowDownIcon />
            </div>
            <Header expand={expand} />
            <div>
                <main className="main">
                    <section className="main-section">
                        <div className="section-content-coders">
                            <TitleMain 
                            className="content-coders-title"
                            title="Coders"
                            subtitle="General Information"
                            />
                            <LanguageSelector />
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
                            ? coders.coders.map((coder:ICoder, index:number)=>(
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
                        <div className="section-buttons">
                            <KeyboardArrowLeftIcon className="button-left" />
                            <KeyboardArrowRightIcon className="button-right" />
                        </div>
                    </section>
                </main>
                <footer className="footer">
                    <Link href="#" className="link">Riwi</Link>
                    <Link href="#" className="link">Terms</Link>
                    <Link href="#" className="link">Privacy</Link>
                    <Link href="#" className="link">Docs</Link>
                </footer>
            </div>
        </div>
    )
}