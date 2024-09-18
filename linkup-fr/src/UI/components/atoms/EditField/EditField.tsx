'use client';

import { TextInputProps } from '@/UI/interfaces/Input';
import { useDarkMode } from '@/global-states/dark-mode';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { ChangeEvent, FocusEvent } from 'react';

// Definir una interfaz extendida para los props del componente
interface EditFieldProps extends TextInputProps {
    edit?: boolean;
    save?: boolean;
    onSave?: (value: string) => void;
    value: string;
}

// Estilización del TextField utilizando MUI
const EditFieldStyle = styled(TextField)(({ theme }) => ({
    width: '100%',
    textTransform: 'none',
    fontFamily: 'var(--main-font)',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'transparent', // Inicialmente transparente
        },
        '&.Mui-focused fieldset': {
            borderColor: 'var(--main-color)', // Cambia el color del borde al estar enfocado
        },
        // No hover effect
    },
    '& .MuiInputLabel-outlined': {
        color: theme.palette.text.primary, // Color del label basado en el tema
        backgroundColor: 'transparent', // Elimina cualquier fondo en el label
        borderColor: 'transparent', // Quita cualquier borde gris
        cursor: 'default', // Elimina el cursor pointer
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
        color: 'var(--main-color)', // Cambia el color del label al estar enfocado
    },
    "& .MuiInputLabel-root.Mui-error": {
        color: "var(--red-color)", // Cambia el color del label en caso de error
    },
    "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
        borderColor: "var(--main-color)", // Cambia el borde al haber error
    },
    "& .MuiFormHelperText-root.Mui-error": {
        color: "var(--red-color)", // Cambia el color del texto de ayuda en caso de error
    },
}));

const EditField: React.FC<EditFieldProps> = ({ 
    type = 'text', 
    name, 
    value, // Usar `value` en lugar de `defaultValue`
    error = false, 
    required = false, 
    helperText = '', 
    onChange,
    edit = false,
    save = false,
    onSave
}) => {
    const DarkMode = useDarkMode((state) => state.DarkMode);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event); // Asegúrate de que onChange esté pasando el valor actualizado
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
        if (save && onSave) {
            onSave(event.target.value); // Guarda el valor al perder el foco si es necesario
        }
    };

    return (
        <EditFieldStyle
            id='outlined-error-helper-text'
            type={type}
            value={value} // Usar `value` en lugar de `defaultValue`
            placeholder={name} // Usar `name` como el placeholder
            error={error}
            required={required}
            helperText={helperText}
            size='small'
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!edit} // Desactiva el input si no está en modo de edición
            sx={{ 
                width: '250px',
                '& .MuiInputBase-input': {
                    color: DarkMode ? 'var(--white-color)' : 'var(--grey-color)', // Color del texto basado en el tema
                    backgroundColor: DarkMode ? 'transparent' : 'transparent' // Fondo transparente
                }
            }}
        />
    );
};

export default EditField;


