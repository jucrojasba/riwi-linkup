'use client'

import HeaderProfile from "../../molecules/ProfileHeader/ProfileHeader";
import './SectionProfile.css'


interface ISectionProfile {
    isDarkMode: boolean;
    language: boolean;
}

const SectionProfile: React.FC<ISectionProfile> = ({ isDarkMode, language }) => {
    return (
        <div className="section-profile">
            <HeaderProfile language={language} companyName='Celsia' sector="manufactura" imageProfile="/images/womanImage.png" isDarkMode={isDarkMode}/>
        </div>
    );
};

export default SectionProfile;