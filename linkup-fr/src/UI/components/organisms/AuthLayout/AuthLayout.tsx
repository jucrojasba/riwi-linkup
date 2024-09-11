'use client';

import RiwiLogo from "../../atoms/RiwiLogo/RiwiLogo";
import NavbarHome from "../../molecules/NavbarHome/NavbarHome";
import UtilityRightButtons from "../../molecules/UtilityRightButtons/UtilityRightButtons";

interface IAuthLayoutProps{
    isDarkMode:boolean;
}

const AuthLayout: React.FC<IAuthLayoutProps>=({isDarkMode})=>{
    return(
        <>
            <NavbarHome isDarkMode={isDarkMode} />
            <UtilityRightButtons isDarkMode={isDarkMode} />
            <RiwiLogo isDarkMode={isDarkMode} />
        </>
    );
};

export default AuthLayout;