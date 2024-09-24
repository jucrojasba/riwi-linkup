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

// Defining the props interface for the MainProfile component
interface IMainProfile {
    language: boolean;
    email: string;
    phone: string;
    isDarkMode: boolean;
}

// Defining the MainProfile component
const MainProfile: React.FC<IMainProfile> = ({ language, isDarkMode, email, phone }) => {
    // State variables for editing and saving
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    // State variables for the edited email and phone
    const [emailEdit, setEmailEdit] = useState<string>(email);
    const [phoneEdit, setPhoneEdit] = useState<string>(phone);
    // Accessing the authUser and setAuthUser functions from the useAuthUser hook
    const { authUser, setAuthUser } = useAuthUser();

    // Preparing the user information for the update
    const userInfoEdit: IAuthUser = {
        name: authUser.name,
        email: emailEdit,
        token: authUser.token,
        role: authUser.role,
        provider: authUser.provider,
    };

    // Preparing the user data for the patch request
    const userPatchData: IPatchUserRequest = {
        email: emailEdit,
        phoneNumber: phoneEdit,
    };

    // Handle the save operation
    const handleSave = async () => {
        setIsEditing(false);
        setIsSaving(true);

        try {
            // Patch the user data
            const response = await patchUserService(authUser.email, userPatchData);
            if (response && 'status' in response) {
                // Update the authUser state
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

    // Handle the sign-out operation
    const handleSignOut = async () => {
        // Confirm the user wants to delete their account
        const isConfirmed = await confirmDeleteAlert(`${language ? 'Are you sure you want to delete your account?' : '¿Estas seguro que desesas eliminar tu cuenta?'}`, language);
        if (!isConfirmed) return;
        // Delete the user account
        await deleteUserService(authUser.email);
        inputAlert(`${language ? 'Account deleted successfully' : 'Cuenta eliminada con éxito'}`, 'success');
        // Clear the local storage and sign out the user
        clearLocalStorage();
        await signOut({ callbackUrl: "/login" });
    }

    // Render the main profile component
    return (
        <div className={isDarkMode ? 'main-profile-dark' : 'main-profile'}>
            <h3>{language ? 'Personal Information' : 'Información Personal'}</h3>
            <div className='personal-information'>
                <p>{language ? 'Email' : 'Correo'}</p>
                <EditField
                    // Passing the email edit state and update function
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
                    // Passing the phone edit state and update function
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
                    // Configuring the edit/save button
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
                    // Configuring the delete account button
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