'use client'

import { useAuthUser } from "@/global-states/authUser";
import HeaderProfile from "../../molecules/ProfileHeader/ProfileHeader";
import MainProfile from "../../molecules/ProfileMain/ProfileMain";
import './SectionProfile.css'


interface ISectionProfile {
    isDarkMode: boolean;
    language: boolean;
}

const SectionProfile: React.FC<ISectionProfile> = ({ isDarkMode, language }) => {
    return (
        <div className="section-profile">
            <HeaderProfile language={language} companyName='Celsia' sector="manufactura" imageProfile="/images/womanImage.png" isDarkMode={isDarkMode}/>
            <MainProfile language={language} email='jane.smith@example.com' phone='123456789' isDarkMode={isDarkMode}/>
        </div>
    );
};

export default SectionProfile;