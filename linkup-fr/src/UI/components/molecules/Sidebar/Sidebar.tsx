import "./sidebarStyles.css";
import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import SettingsIcon from "@mui/icons-material/Settings";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ComputerIcon from "@mui/icons-material/Computer";
import LogoutIcon from "@mui/icons-material/Logout";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import ItemNav from "@/UI/components/atoms/ItemNav/ItemNav";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useLanguage } from "@/global-states/language-mode";
import { signOut } from "next-auth/react";
import { clearLocalStorage } from "@/utilities/LocalStorage";
import { capitalizeSentece } from "@/utilities/CapitalizeSentence";
import { useAuthUser } from "@/global-states/authUser";

interface ISidebarProps {
  expand: boolean;
  openSidebar?: boolean;
  setOpenSidebar?: Dispatch<SetStateAction<boolean>>;
  language:boolean;
}

export default function Sidebar({ expand, language }: ISidebarProps): React.ReactNode {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const authState = useAuthUser((state)=>state.authUser);

  const navDataIcons = [
    { name: language? 'Tablero':"Dashboard", src: SpaceDashboardIcon, href: "/dashboard" },
    { name: language? 'Desarrolladores':"Coders", src: ComputerIcon, href: "/coders" },
    { name: language? 'Configuración':"Config", src: SettingsIcon, href: "/config" },
    { name: language? 'Mi Lista':"My List", src: ChecklistRtlIcon, href: "/login" },
  ];

  const handleOpenMenu = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleSignOut = () =>{
    clearLocalStorage();
    signOut({callbackUrl:"/"});

  }
  return (
    <div className={openSidebar ? "sidebarWidth" : "sidebar"}>
      <div className="sidebar-content-user">
        <div>
          <div className="icon" onClick={handleOpenMenu}>
            <MenuOpenIcon />
          </div>
          <h2 className="sidebar-title">
            {openSidebar ? "LinkUp" : "Riwi LinkUp"}
          </h2>
        </div>
        <div className="content-user-image">
          <Image
            className="image"
            src={"/images/womanImage.avif"}
            alt=""
            width={100}
            height={100}
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
        </div>
        <h5 className="content-user-welcome">
          {language ? "Bienvenido" : "Welcome back"}
        </h5>
        <h3 className="content-user-name">{capitalizeSentece(authState.name)}</h3>
      </div>
      <nav className="navbar">
        <ul className="navbar-list">
          <div>
            {navDataIcons.map((icon) => (
              <ItemNav
                key={icon.name}
                icon={icon.src}
                href={icon.href}
                name={icon.name}
                openSidebar={openSidebar}
              />
            ))}
          </div>
          <ItemNav
            openSidebar={openSidebar}
            icon={LogoutIcon}
            href={"#"}
            name={language?'Salir':"Logout"}
            onClick={handleSignOut}
          />
        </ul>
      </nav>
    </div>
  );
}
