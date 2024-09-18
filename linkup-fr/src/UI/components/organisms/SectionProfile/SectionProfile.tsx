'use client'

import { useAuthUser } from "@/global-states/authUser";
import HeaderProfile from "../../molecules/ProfileHeader/ProfileHeader";
import MainProfile from "../../molecules/ProfileMain/ProfileMain";
import { getUserService } from '@/services/userService';
import './SectionProfile.css'
import { useEffect, useState } from "react";
import { IUser } from "@/app/api/interfaces/IUserInterface";
import { LinearLoader } from '../../atoms/loaders/Loaders';
import { IUserBack } from "@/UI/interfaces/IUserInterface";
import { capitalizeSentece } from "@/utilities/CapitalizeSentence";

interface ISectionProfile {
    isDarkMode: boolean;
    language: boolean;
}

const SectionProfile: React.FC<ISectionProfile> = ({ isDarkMode, language }) => {
    const AuthUser = useAuthUser((state) => state.authUser);
    const [loadingInfo, setLoadingInfo] = useState<boolean>(true);
    const [user, setUser] = useState<IUserBack>();
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoadingInfo(true);
                const data = await getUserService('jane.smith@example.com');
                
                if (data && "message" in data) {
                    console.log({ message: data });
                } else {
                    setUser(data);
                    console.log(data);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoadingInfo(false);
            }
        };
        fetchUserData();
    }, []);

    return (
        <>
            {loadingInfo ? (
                <LinearLoader flag={true} />
            ) : (
                <div className="section-profile">
                    <HeaderProfile language={language} companyName={capitalizeSentece(`${user?.name}`)} sector='manufactura' imageProfile="/images/womanImage.png" isDarkMode={isDarkMode} />
                    <MainProfile language={language} email='jane.smith@example.com' phone='123456789' isDarkMode={isDarkMode} />
                </div>
            )}
        </>
    );
};

export default SectionProfile;
