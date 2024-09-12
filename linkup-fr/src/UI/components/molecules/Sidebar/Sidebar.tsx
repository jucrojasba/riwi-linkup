import React from "react";
import Image from "next/image";
import SettingsIcon from "@mui/icons-material/Settings";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ComputerIcon from "@mui/icons-material/Computer";
import LogoutIcon from "@mui/icons-material/Logout";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import ItemNav from "@/UI/components/atoms/ItemNav/ItemNav";
import "./sidebarStyles.css";

interface ISidebarProps {
  expand: boolean;
}

export default function Sidebar({ expand }: ISidebarProps): React.ReactNode {
  const navDataIcons = [
    { name: "Dashboard", src: SpaceDashboardIcon, href: "/dashboard" },
    { name: "Coders", src: ComputerIcon, href: "/coders" },
    { name: "Config", src: SettingsIcon, href: "/config" },
    { name: "MyList", src: ChecklistRtlIcon, href: "/login" },
  ];
  return (
    <div className="sidebar">
      <div className="sidebar-content-user">
        <h2 className="sidebar-title">Riwi-LinkUp</h2>
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
        <h5 className="content-user-welcome">Welcome back.</h5>
        <h3 className="content-user-name">Team</h3>
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
              />
            ))}
          </div>
          <ItemNav icon={LogoutIcon} href={""} name="Logout" />
        </ul>
      </nav>
    </div>
  );
}