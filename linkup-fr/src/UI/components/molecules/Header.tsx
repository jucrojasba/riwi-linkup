import React from "react";
import Image from "next/image";
import SettingsIcon from '@mui/icons-material/Settings';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ComputerIcon from '@mui/icons-material/Computer';
import LogoutIcon from '@mui/icons-material/Logout';
import ItemNav from "@/UI/components/atoms/ItemNav";

export default function Header(): React.ReactNode{
    const navDataIcons = [
        {name: "Dashboard", src: SpaceDashboardIcon, href: ""},
        {name: "Coders", src: ComputerIcon, href: ""},
        {name: "Config", src: SettingsIcon, href: ""},
    ]
    return(
        <header className="header">
                <div className="header-content-user">
                <h2 className="header-title">Riwi-LinkUp</h2>
                    <div className="content-user-image">
                        <Image className="image" src={"/images/imageDefault.jpg"} alt="" width={100} height={100} style={{borderRadius: "50%"}} />
                    </div>
                    <h5 className="content-user-welcome">Welcome back.</h5>
                    <h3 className="content-user-name">Riwi</h3>
                </div>
                <nav className="header-nav">
                    <ul className="header-nav-list">
                        <div>
                            {navDataIcons.map((icon)=> (
                                <ItemNav
                                icon={icon.src}
                                href={icon.href}
                                name={icon.name}
                                />
                            ))}
                        </div> 
                        <ItemNav
                        icon={LogoutIcon}
                        href={""}
                        name="Logout"
                        />
                    </ul>
                </nav>
        </header>
    )
}