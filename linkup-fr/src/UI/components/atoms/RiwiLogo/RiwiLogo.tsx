'use client'
import Image from "next/image";
import "./RiwiLogo.css";

interface IRiwiLogoProps {
  isDarkMode: boolean;
}

export default function RiwiLogo({
  isDarkMode,
}: IRiwiLogoProps): React.ReactNode {
  return (
    <div className="riwi-logo-container">
        <Image
            className="nav-logo"
            src={isDarkMode ? "/icons/logoRiwiPurple.svg" : "/icons/logoRiwi.svg"}
            alt="Riwi"
            width={90}
            height={40}
          />
    </div>
  );
}
