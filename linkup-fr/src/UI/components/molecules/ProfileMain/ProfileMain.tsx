'use client';
import { useState } from 'react';
import { CustomButton, EditField, MainButton } from '../../atoms';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
import './ProfileMain.css';
import { IAuthUser, useAuthUser } from '@/global-states/authUser';
import { IPatchUserRequest } from '@/UI/interfaces/IUserInterface';
import { deleteUserService, patchUserService } from '@/services/userService';
import { confirmDeleteAlert, inputAlert } from '../Alert/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import { clearLocalStorage } from '@/utilities/LocalStorage';
import { signOut } from 'next-auth/react';

// Definiendo la interfaz de propiedades para el componente MainProfile
interface IMainProfile {
    language: boolean;
    email: string;
    phone: string;
    isDarkMode: boolean;
}

// Definiendo el componente MainProfile
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
                inputAlert(`${language ? 'Data Updated Successfully' : 'Datos Actualizados Correctamente'}`, 'success');
            } else {
                inputAlert(`${language ? 'Data Update Failed' : 'Error al Actualizar los Datos'}`, 'error');
            }
        } catch (error) {
            inputAlert(`${language ? 'Data Update Failed' : 'Error al Actualizar los Datos'}`, 'error');
        } finally {
            setIsSaving(false);
        }
    };

    const handleSignOut = async () => {
        const isConfirmed = await confirmDeleteAlert(`${language ? 'Are you sure you want to delete your account?' : '¿Estas seguro que desesas eliminar tu cuenta?'}`, language);
        if (!isConfirmed) return;

        await deleteUserService(authUser.email);
        inputAlert(`${language ? 'Account deleted successfully' : 'Cuenta eliminada con éxito'}`, 'success');
        clearLocalStorage();
        await signOut({ callbackUrl: "/login" });
    }

    return (
        <div className={isDarkMode ? 'main-profile-dark' : 'main-profile'}>
            <h3>{language ? 'Personal Information' : 'Información Personal'}</h3>
            <div className='personal-information'>
                <p>{language ? 'Email' : 'Correo'}</p>
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
                <p>{language ? 'Phone' : 'Teléfono'}</p>
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
                            {isEditing ? 'Save' : 'Edit'} <ModeEditIcon sx={{ fontSize: "1rem" }} />
                        </> :
                        <>
                            {isEditing ? 'Guardar' : 'Editar'} <ModeEditIcon sx={{ fontSize: "1rem" }} />
                        </>
                    }
                    clickedText={language ?
                        <>
                            Save <SaveIcon sx={{ fontSize: "1rem" }} />
                        </> :
                        <>
                            Guardar <SaveIcon sx={{ fontSize: "1rem" }} />
                        </>
                    }
                    initialBgColor='var(--main-color)'
                    clickedBgColor='var(--green-color)'
                    onClick={() => setIsEditing(!isEditing)}
                    secondOnClick={handleSave}
                />
                <MainButton
                    text={language ? 'Delete Account' : 'Eliminar Cuenta'}
                    bgColor='var(--red-color)'
                    icon={<DeleteIcon sx={{ fontSize: '1.2rem' }} />}
                    onClick={handleSignOut}
                    className="delete-button"
                />
            </div>
        </div>
    );
};

export default MainProfile;
