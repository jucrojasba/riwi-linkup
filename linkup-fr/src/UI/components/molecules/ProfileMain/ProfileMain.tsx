'use client';
import { useState } from 'react';
import { CustomButton, EditField } from '../../atoms';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
import './ProfileMain.css';
interface IMainProfile {
    language: boolean;
    email: string;
    phone: string;
    isDarkMode: boolean;
}

const MainProfile: React.FC<IMainProfile> = ({ language, isDarkMode, email, phone }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    

    return (
        <div className={isDarkMode ? 'main-profile-dark' : 'main-profile'}>
            <h3>{language ? 'Información Personal' : 'Personal Information'}</h3>
            <div className='personal-information'>
              <p>{language?'Correo':'Email'}</p>
              <EditField name='email' label='' defaultValue={email} onChange={() => {}} edit={isEditing} DarkMode={isDarkMode} save={isSaving} onSave={(value)=>{
                console.log('value', value);
              }}/>
              <p>{language?'Teléfono':'Phone'}</p>
              <EditField name='number' label='' defaultValue={phone} onChange={() => {}} edit={isEditing} DarkMode={isDarkMode} save={isSaving} onSave={(value)=>{
                console.log('value', value);
              }}/>
            </div>
            <div className="action-buttons">
                <CustomButton 
                    initialText={language ? 
                        <>
                            {isEditing ? 'Guardar' : 'Editar'} <ModeEditIcon sx={{ fontSize: "1rem" }} />
                        </> :
                        <>
                            {isEditing ? 'Save' : 'Edit'} <ModeEditIcon sx={{ fontSize: "1rem" }} />
                        </>
                    }
                    clickedText={language ?
                        <>
                            Guardar <SaveIcon sx={{ fontSize: "1rem" }} />
                        </> :
                        <>
                            Save <SaveIcon sx={{ fontSize: "1rem" }} />
                        </>
                    }
                    initialBgColor='var(--main-color)'
                    clickedBgColor='var(--green-color)'
                    onClick={()=>{setIsEditing(true)}}
                    secondOnClick={() => {
                      setIsEditing(false);
                      setIsSaving(true);
                    }}
                />
            </div>
        </div>
    );
};

export default MainProfile;
