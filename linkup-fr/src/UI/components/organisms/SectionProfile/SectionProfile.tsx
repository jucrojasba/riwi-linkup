'use client'; // Indicates that this component uses client-side rendering

import { useAuthUser } from "@/global-states/authUser"; // Hook to get authentication user state
import HeaderProfile from "../../molecules/ProfileHeader/ProfileHeader"; // Importing the profile header component
import MainProfile from "../../molecules/ProfileMain/ProfileMain"; // Importing the main profile component
import { getUserServiceByEmail } from '@/services/userService'; // Service to fetch user data by email
import './SectionProfile.css'; // Importing styles
import { useEffect, useState } from "react"; // React hooks
import { LinearLoader } from '../../atoms/loaders/Loaders'; // Loader component
import { IApiResponseUser } from "@/UI/interfaces/IUserInterface"; // Interface for user data
import { capitalizeSentece } from "@/utilities/CapitalizeSentence"; // Utility function to capitalize sentences

// Define the props for the SectionProfile component
interface ISectionProfile {
    isDarkMode: boolean; // Flag for dark mode
    language: boolean; // Language flag
}

// Functional component definition
const SectionProfile: React.FC<ISectionProfile> = ({ isDarkMode, language }) => {
    const authState = useAuthUser((state) => state.authUser); // Get authenticated user state
    const [loadingInfo, setLoadingInfo] = useState<boolean>(true); // State for loading status
    const [user, setUser] = useState<IApiResponseUser>(); // State for user data
    
    // useEffect to fetch user data when the component mounts or authState changes
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoadingInfo(true); // Set loading to true
                const data = await getUserServiceByEmail(`${authState.email ? authState.email : "undefined"}`); // Fetch user data
                if (data && "message" in data) {
                    // Handle error (no action taken here, could be improved)
                } else {
                    setUser(data); // Set user data if successful
                }
            } catch (error) {
                console.error("Error fetching user data:", error); // Log any errors
            } finally {
                setLoadingInfo(false); // Set loading to false
            }
        };
        fetchUserData(); // Call the fetch function
    }, [authState]); // Dependency array, runs when authState changes

    return (
        <>
            {loadingInfo ? (
                <LinearLoader flag={true} /> // Show loader if loading
            ) : (
                <div className="section-profile"> {/* Profile section container */}
                    <HeaderProfile 
                        language={language} 
                        companyName={capitalizeSentece(`${user?.user.name}`)} 
                        sector={`${user?.user.sector.name}`} 
                        imageProfile="/images/womanImage.png" 
                        isDarkMode={isDarkMode} 
                    />
                    <MainProfile 
                        language={language} 
                        email={`${user?.user.email}`} 
                        phone={`${user?.user.phoneNumber}`} 
                        isDarkMode={isDarkMode} 
                    />
                </div>
            )}
        </>
    );
};

export default SectionProfile; // Export the component
