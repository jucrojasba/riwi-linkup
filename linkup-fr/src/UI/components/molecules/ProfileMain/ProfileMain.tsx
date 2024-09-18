'use client'
import { CustomButton } from '../../atoms';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
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
                <h3>{language?'Información Personal':'Personal Information'}</h3>
                <p>{email}</p>
                <p>{phone}</p>
                <div className="action-buttons">
                <CustomButton 
                initialText={language?
                    <>
                      Editar <ModeEditIcon sx={{ fontSize: "1rem" }} />
                    </> :
                    <>
                      Edit <ModeEditIcon sx={{ fontSize: "1rem" }} />
                    </>
                  }
                  clickedText={language? 
                  <>
                    Guardar <SaveIcon sx={{ fontSize: "1rem" }} />
                  </>:
                  <>
                    Save <SaveIcon sx={{ fontSize: "1rem" }} />
                  </>
                  }
                  initialBgColor='var(--main-color)'
                  clickedBgColor='var(--green-color)'
                  onClick={()=>{}}
                  secondOnClick={()=>{}}
                
                />
                </div>
        </div>
    );
};

export default MainProfile;