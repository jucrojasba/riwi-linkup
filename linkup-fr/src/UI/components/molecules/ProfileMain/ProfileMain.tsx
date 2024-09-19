'use client';
import { useState } from 'react';
import { CustomButton, EditField, MainButton } from '../../atoms';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
import './ProfileMain.css';
import { IAuthUser, useAuthUser } from '@/global-states/authUser';
import { IPatchUserRequest } from '@/UI/interfaces/IUserInterface';
import { patchUserService } from '@/services/userService';
import { inputAlert } from '../Alert/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import { clearLocalStorage } from '@/utilities/LocalStorage';
import { signOut } from 'next-auth/react';

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

    const userPatchData: IPatchUserRequest = {
        email: emailEdit,
        phoneNumber: phoneEdit,
    };

    const handleSave = async () => {
        setIsEditing(false);
        setIsSaving(true);

        try {
            const response = await patchUserService(authUser.email, userPatchData);
            if (response && 'status' in response) {
                setAuthUser(userInfoEdit);
                inputAlert(`${language ? 'Datos Actualizados Correctamente' : 'Data Updated Successfully'}`, 'success');
            } else {
                inputAlert(`${language ? 'Error al Actualizar los Datos' : 'Data Update Failed'}`, 'error');
            }
        } catch (error) {
            inputAlert(`${language ? 'Error al Actualizar los Datos' : 'Data Update Failed'}`, 'error');
        } finally {
            setIsSaving(false);
        }
    };

    const handleSignOut = async () => {
        clearLocalStorage();
        await signOut({ callbackUrl: "/login" });
    }

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
                    onSave={handleSave}
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
                    onSave={handleSave}
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
                <MainButton text={language ? 'Eliminar Cuenta' : 'Delete Account'} bgColor='var(--red-color)' icon={<DeleteIcon sx={{ fontSize: '1.2rem' }} />} onClick={handleSignOut} className="delete-button" />
            </div>
        </div>
    );
};

export default MainProfile;
