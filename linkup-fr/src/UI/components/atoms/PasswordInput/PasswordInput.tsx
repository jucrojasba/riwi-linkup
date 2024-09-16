'use client';

import React, { useState } from 'react';
import { TextInputProps } from '@/UI/interfaces/Input';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';
import { useDarkMode } from '@/global-states/dark-mode';

const PasswordInputStyle = styled(TextField)(() => ({
    textTransform: 'none',
    fontFamily: 'var(--main-font)',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'var(--main-color)', // Cambia el color del borde
        },
        '&.Mui-focused fieldset': {
            borderColor: 'var(--main-color)', // Cambia el color del borde cuando está enfocado
        },
        // Sin efecto hover
    },
    '& .MuiInputLabel-outlined': {
        color: 'var(--main-color)', // Cambia el color del label por defecto
        backgroundColor: 'transparent', // Elimina el fondo del label
        borderColor: 'transparent', // Quita el borde gris
        cursor: 'default', // Evita el cursor pointer
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
        color: 'var(--main-color)', // Cambia el color del label cuando está enfocado
    },
    '& .MuiInputLabel-root.Mui-error': {
        color: 'var(--red-color)', // Cambia el color del label en caso de error
    },
    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: 'var(--main-color)', // Cambia el borde cuando hay error
    },
    '& .MuiFormHelperText-root.Mui-error': {
        color: 'var(--red-color)', // Cambia el color del texto de ayuda en caso de error
    },
}));

const PasswordInput: React.FC<TextInputProps> = ({
    type = 'text',
    name,
    defaultValue = '',
    error = false,
    required = false,
    label,
    helperText = '',
    onChange,
}) => {

    const [showPassword, setShowPassword] = useState(false);
    const DarkMode = useDarkMode((state) => state.DarkMode);

    const handleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <>
            {DarkMode?
            <PasswordInputStyle
            id="outlined-error-helper-text"
            name={name}
            type={type === 'password' && !showPassword ? 'password' : 'text'}
            defaultValue={defaultValue}
            label={label}
            error={error}
            required={required}
            helperText={helperText}
            size="small"
            onChange={onChange}
            sx={{ width: '250px', '& .MuiInputBase-input': {color:'var(--white-color)'}}}
            InputProps={{
                endAdornment: type === 'password' && (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleShowPassword}
                            edge="end"
                            sx={{color:'var(--main-color)'}}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
            :<PasswordInputStyle
            id="outlined-error-helper-text"
            name={name}
            type={type === 'password' && !showPassword ? 'password' : 'text'}
            defaultValue={defaultValue}
            label={label}
            error={error}
            required={required}
            helperText={helperText}
            size="small"
            onChange={onChange}
            sx={{ width: '250px' }}
            InputProps={{
                endAdornment: type === 'password' && (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleShowPassword}
                            edge="end"
                            sx={{color:'var(--main-color)'}}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />}
        
        </>
        
    );
};

export default PasswordInput;
