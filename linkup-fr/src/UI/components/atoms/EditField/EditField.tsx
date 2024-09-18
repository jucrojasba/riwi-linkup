'use client';

import { TextInputProps } from '@/UI/interfaces/Input';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { ChangeEvent, useState, useEffect } from 'react';

interface EditFieldProps extends TextInputProps {
    edit?: boolean;
    save?: boolean;
    onSave?: (value: string) => void;
    DarkMode: boolean;
    defaultValue: string;
}

const EditFieldStyle = styled(TextField)<{ edit: boolean }>(({ theme, edit }) => ({
    width: '100%',
    textTransform: 'none',
    fontFamily: 'var(--main-font)',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: edit ? 'var(--main-color)' : 'transparent',
        },
        '&.Mui-focused fieldset': {
            borderColor: edit ? 'var(--main-color)' : 'transparent',
        },
    },
    '& .MuiInputLabel-outlined': {
        display: 'none', 
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
        display: 'none', 
    },
    '& .MuiInputLabel-root.Mui-error': {
        color: 'var(--red-color)',
    },
    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: 'var(--main-color)',
    },
    '& .MuiFormHelperText-root.Mui-error': {
        color: 'var(--red-color)',
    },
    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
    },
}));

const EditField: React.FC<EditFieldProps> = ({ 
    type = 'text', 
    name, 
    defaultValue, 
    error = false, 
    required = false, 
    helperText = '', 
    onChange,
    edit = false,
    save = false,
    onSave,
    DarkMode,
}) => {
    const [inputValue, setInputValue] = useState(defaultValue);
    const [inputError, setInputError] = useState(false);

    useEffect(() => {
        if (!edit) {
            setInputError(false);
        }
    }, [edit]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        onChange?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (save && onSave) {
            const value = event.target.value;
            let isValid = true;

            if (name === 'email') {
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            } else if (name === 'number') {
                isValid = /^[0-9]+$/.test(value);
            }

            if (!isValid) {
                setInputError(true);
                setInputValue(defaultValue);
            } else {
                setInputError(false);
                onSave(value);
            }
        }
    };

    return (
        <EditFieldStyle
            edit={edit}
            id='outlined-error-helper-text'
            type={type}
            name={name}
            value={inputValue}
            error={inputError} 
            required={required}
            helperText={inputError ? 'Valor no válido' : helperText}
            size='small'
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!edit}
            sx={{ 
                width: '250px',
                '& .MuiInputBase-input': {
                    color: DarkMode ? 'var(--white-color)' : 'var(--paragraph-color-gray)',
                    backgroundColor: 'transparent'
                }
            }}
        />
    );
};

export default EditField;
