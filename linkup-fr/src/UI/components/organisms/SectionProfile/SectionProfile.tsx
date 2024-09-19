'use client'

import { useAuthUser } from "@/global-states/authUser";
import HeaderProfile from "../../molecules/ProfileHeader/ProfileHeader";
import MainProfile from "../../molecules/ProfileMain/ProfileMain";
import { getUserService } from '@/services/userService';
import './SectionProfile.css'
import { useEffect, useState } from "react";
import { LinearLoader } from '../../atoms/loaders/Loaders';
import { IApiResponseUser } from "@/UI/interfaces/IUserInterface";
import { capitalizeSentece } from "@/utilities/CapitalizeSentence";

interface ISectionProfile {
    isDarkMode: boolean;
    language: boolean;
}

const SectionProfile: React.FC<ISectionProfile> = ({ isDarkMode, language }) => {
    const authState = useAuthUser((state)=>state.authUser);
    const [loadingInfo, setLoadingInfo] = useState<boolean>(true);
    const [user, setUser] = useState<IApiResponseUser>();
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoadingInfo(true);
                const data = await getUserService(`${authState.email ? authState.email : "undefined"}`);
                if (data && "message" in data) {
                } else {
                    setUser(data);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoadingInfo(false);
            }
        };
        fetchUserData();
    }, [authState]);

    return (
        <>
            {loadingInfo ? (
                <LinearLoader flag={true} />
            ) : (
                <div className="section-profile">
                    <HeaderProfile language={language} companyName={capitalizeSentece(`${user?.user.name}`)} sector={`${user?.user.sector.name}`} imageProfile="/images/womanImage.png" isDarkMode={isDarkMode} />
                    <MainProfile language={language} email={`${user?.user.email}`} phone={`${user?.user.phoneNumber}`} isDarkMode={isDarkMode} />
                </div>
            )}
        </>
    );
};

export default SectionProfile;
