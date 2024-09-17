'use client'
import './ProfileMain.css'
import { RoundedButton} from '../../atoms/index'
interface IMainProfile {
    language: boolean;
    email: string;
    phone: string;
    isDarkMode: boolean;
}

const MainProfile: React.FC<IMainProfile> = ({ language, isDarkMode, email, phone }) => {

    return (
        <div className={isDarkMode?'main-profile-dark':"main-profile"}>
                <h3>Personal Information</h3>
                <p>{email}</p>
                <p>{phone}</p>
                <RoundedButton
                text={language? 'Editar':"Edit"}
                onClick={() => {
                }}/>
        </div>
    );
};

export default MainProfile;