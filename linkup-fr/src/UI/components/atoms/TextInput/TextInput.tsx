'use client'

import { TextInputProps } from '@/UI/interfaces/Input';
import { useDarkMode } from '@/global-states/dark-mode';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const TextInputStyle = styled(TextField)(() => ({
    width: '100%',
    textTransform: 'none',
    fontFamily: 'var(--main-font)',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'var(--main-color)', // Cambia el color del borde
        },
        '&.Mui-focused fieldset': {
            borderColor: 'var(--main-color)', // Cambia el color del borde al estar enfocado
        },
        // No hover effect
    },
    '& .MuiInputLabel-outlined': {
        color: 'var(--main-color)', // Cambia el color del label por defecto
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

const TextInput: React.FC<TextInputProps> = ({ 
    type = 'text', 
    name, 
    defaultValue = '', 
    error = false, 
    required = false, 
    label, 
    helperText = '', 
    onChange 
}) => {

    const DarkMode = useDarkMode((state) => state.DarkMode);

    return (
        <>
            {DarkMode?
                <TextInputStyle 
                    id='outlined-error-helper-text' 
                    type={type} 
                    name={name} 
                    defaultValue={defaultValue} 
                    label={label} 
                    error={error} 
                    required={required} 
                    helperText={helperText} 
                    size='small' 
                    onChange={onChange} 
                    sx={{ width: '100%','& .MuiInputBase-input': {color:'var(--white-color)'}}} 
                />
                :<TextInputStyle 
                    id='outlined-error-helper-text' 
                    type={type} 
                    name={name} 
                    defaultValue={defaultValue} 
                    label={label} 
                    error={error} 
                    required={required} 
                    helperText={helperText} 
                    size='small' 
                    onChange={onChange} 
                    sx={{ width: '100%'}} 
                />
            }
            
        </>
        
    );
};

export default TextInput;
