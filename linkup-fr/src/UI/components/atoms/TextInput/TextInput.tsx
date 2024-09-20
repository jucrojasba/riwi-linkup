'use client'
import { TextInputProps } from '@/UI/interfaces/Input';
import { useDarkMode } from '@/global-states/dark-mode';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { useId } from 'react';

const TextInputStyle = styled(TextField)(() => ({
    width: '100%',
    textTransform: 'none',
    fontFamily: 'var(--main-font)',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'var(--main-color)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'var(--main-color)',
        },
    },
    '& .MuiInputLabel-outlined': {
        color: 'var(--main-color)',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        cursor: 'default',
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
        color: 'var(--main-color)',
    },
    "& .MuiInputLabel-root.Mui-error": {
        color: "var(--red-color)",
    },
    "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
        borderColor: "var(--main-color)",
    },
    "& .MuiFormHelperText-root.Mui-error": {
        color: "var(--red-color)",
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
    onChange,
}) => {
    const DarkMode = useDarkMode((state) => state.DarkMode);
    const generatedId = useId(); // Generar un ID único si no se pasa uno

    return (
        <>
            {DarkMode?
                <TextInputStyle 
                    id={generatedId}
                    type={type} 
                    name={name} 
                    defaultValue={defaultValue} 
                    label={label} 
                    error={error} 
                    required={required} 
                    helperText={helperText} 
                    size='small' 
                    onChange={onChange} 
                    sx={{ width: { xs: '100%', sm: '300px', md: '400px' }, // Tamaño según el breakpoint
                    '& .MuiInputBase-input': { color: 'var(--white-color)' },
                    '@media (max-width: 480px)': { display: 'none' }, // Oculta en pantallas menores a 480px
                    }}
                />
                :<TextInputStyle 
                    id={generatedId}
                    type={type} 
                    name={name} 
                    defaultValue={defaultValue} 
                    label={label} 
                    error={error} 
                    required={required} 
                    helperText={helperText} 
                    size='small' 
                    onChange={onChange} 
                    sx={{
                        width: { xs: '100%', sm: '300px', md: '400px' }, // Tamaño según el breakpoint
                        '@media (max-width: 480px)': { display: 'none' }, // Oculta en pantallas menores a 480px
                    }} 
                />
            }
            
        </>
    );
};

export default TextInput;
