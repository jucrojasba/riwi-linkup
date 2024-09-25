import "./sidebarStyles.css"; // Import the CSS styles for the sidebar
import React from "react"; // Import React
import Image from "next/image"; // Import Image component from Next.js
import SettingsIcon from "@mui/icons-material/Settings"; // Import Material-UI Settings icon
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard"; // Import Dashboard icon
import ComputerIcon from "@mui/icons-material/Computer"; // Import Computer icon
import LogoutIcon from "@mui/icons-material/Logout"; // Import Logout icon
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl"; // Import Checklist icon
import ItemNav from "@/UI/components/atoms/ItemNav/ItemNav"; // Import ItemNav component
import MenuOpenIcon from "@mui/icons-material/MenuOpen"; // Import Menu Open icon
import { useLanguage } from "@/global-states/language-mode"; // Import language state management
import { signOut } from "next-auth/react"; // Import signOut function from NextAuth
import { clearLocalStorage } from "@/utilities/LocalStorage"; // Import utility to clear local storage
import { capitalizeSentece } from "@/utilities/CapitalizeSentence"; // Import utility to capitalize sentences
import { useAuthUser } from "@/global-states/authUser"; // Import auth user state management
import { useExpand } from "@/global-states/expandSideBar"; // Import expand state management

// Define the interface for props
interface ISidebarProps {
  isExpanded: boolean; // Flag to indicate if the sidebar is expanded
  language: boolean; // Language flag (true for Spanish, false for English)
}

// Sidebar component
export default function Sidebar({ isExpanded, language }: ISidebarProps): React.ReactNode {
  const authState = useAuthUser((state) => state.authUser); // Get the authenticated user state
  const setExpand = useExpand((state) => state.setExpand); // Get the function to set sidebar expansion state

  // Define navigation items with their corresponding icons and routes
  const navDataIcons = [
    { name: language ? 'Tablero' : "Dashboard", src: SpaceDashboardIcon, href: "/dashboard" },
    { name: language ? 'Desarrolladores' : "Coders", src: ComputerIcon, href: "/admin" },
    { name: language ? 'Configuración' : "Config", src: SettingsIcon, href: "/config" },
    { name: language ? 'Mi Lista' : "My List", src: ChecklistRtlIcon, href: "/myList" },
  ];

  // Function to toggle sidebar expansion
  const handleOpenMenu = () => {
    setExpand(!isExpanded); // Toggle the expand state
  };

  // Function to handle user sign out
  const handleSignOut = async () => {
    clearLocalStorage(); // Clear local storage
    await signOut({ callbackUrl: "/login" }); // Sign out and redirect to login
  }

  return (
    <div className={isExpanded ? "sidebarWidth" : "sidebar"}>
      {/* User information section */}
      <div className="sidebar-content-user">
        <div>
          {/* Button to open/close the sidebar */}
          <div className="icon" onClick={handleOpenMenu}>
            <MenuOpenIcon />
          </div>
          <h2 className="sidebar-title">
            {isExpanded ? "LinkUp" : "Riwi LinkUp"}
          </h2>
        </div>
        <div className="content-user-image">
          {/* User image */}
          <Image
            className="image"
            src={"/images/womanImage.png"}
            alt=""
            width={100}
            height={100}
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
        </div>
        <h5 className="content-user-welcome">
          {language ? "Bienvenido" : "Welcome back"}
        </h5>
        <h3 className="content-user-name">{authState.name ? capitalizeSentece(authState.name) : "User"}</h3>
      </div>
      {/* Navigation section */}
      <nav className="navbar">
        <ul className="navbar-list">
          <div>
            {/* Map through navigation data to render ItemNav components */}
            {navDataIcons.map((icon) => (
              <ItemNav
                key={icon.name}
                icon={icon.src}
                href={icon.href}
                name={icon.name}
                openSidebar={isExpanded} // Use isExpanded to control display
              />
            ))}
          </div>
          {/* Logout item */}
          <ItemNav
            openSidebar={isExpanded}
            icon={LogoutIcon}
            href={"#"}
            name={language ? 'Salir' : "Logout"}
            onClick={handleSignOut} // Call sign out function on click
          />
        </ul>
      </nav>
    </div>
  );
}
