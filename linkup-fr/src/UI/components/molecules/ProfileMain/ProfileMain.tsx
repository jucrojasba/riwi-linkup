'use client'
import { CustomButton } from '../../atoms';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import './ProfileMain.css'
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
                <CustomButton 
                initialText={language?
                    <>
                      Editar <ModeEditIcon sx={{ fontSize: "1rem" }} />
                    </> :
                    <>
                      Edit <ModeEditIcon sx={{ fontSize: "1rem" }} />
                    </>
                  }
                  clickedText={language? 'Guardar':'Save'}
                  initialBgColor='var(--border-color-gray)'
                  clickedBgColor='var(--white-color)'
                  onClick={()=>{}}
                  secondOnClick={()=>{}}
                
                />
        </div>
    );
};

export default MainProfile;