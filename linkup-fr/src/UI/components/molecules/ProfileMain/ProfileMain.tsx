'use client';
import { useState } from 'react';
import { CustomButton, EditField } from '../../atoms';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
import './ProfileMain.css';
import { IAuthUser, useAuthUser } from '@/global-states/authUser';

interface IMainProfile {
    language: boolean;
    email: string;
    phone: string;
    isDarkMode: boolean;
}

const MainProfile: React.FC<IMainProfile> = ({ language, isDarkMode, email, phone }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [emailEdit, setEmailEdit] = useState<string>(email);
    const [phoneEdit, setPhoneEdit] = useState<string>(phone);
    const { authUser, setAuthUser } = useAuthUser();

    const userInfoEdit: IAuthUser = {
        name: authUser.name,
        email: emailEdit,
        token: authUser.token,
        role: authUser.role,
        provider: authUser.provider,
    };

    const handleSave = () => {
        setIsEditing(false);
        setIsSaving(true);
        setAuthUser(userInfoEdit);
    };

    return (
        <div className={isDarkMode ? 'main-profile-dark' : 'main-profile'}>
            <h3>{language ? 'Información Personal' : 'Personal Information'}</h3>
            <div className='personal-information'>
                <p>{language ? 'Correo' : 'Email'}</p>
                <EditField
                    name='email'
                    label=''
                    defaultValue={emailEdit}
                    onChange={(e) => setEmailEdit(e.target.value)}
                    edit={isEditing}
                    DarkMode={isDarkMode}
                    save={isSaving}
                    onSave={() => handleSave()}
                />
                <p>{language ? 'Teléfono' : 'Phone'}</p>
                <EditField
                    name='number'
                    label=''
                    defaultValue={phoneEdit}
                    onChange={(e) => setPhoneEdit(e.target.value)}
                    edit={isEditing}
                    DarkMode={isDarkMode}
                    save={isSaving}
                    onSave={() => handleSave()}
                />
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
                    onClick={() => setIsEditing(!isEditing)}
                    secondOnClick={handleSave}
                />
            </div>
        </div>
    );
};

export default MainProfile;
