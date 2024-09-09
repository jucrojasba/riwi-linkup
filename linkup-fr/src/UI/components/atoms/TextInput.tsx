'use client'

import { TextInputProps } from '@/UI/interfaces/Input';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const TextInputStyle = styled(TextField)(() => ({
    textTransform:'none',
    fontFamily:'var(--main-font)',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'var(--main-color)', // Change border color
        },
        '&:hover fieldset': {
          borderColor: 'var(--main-color)', // Change border color on hover
        },
        '&.Mui-focused fieldset': {
          borderColor: 'var(--main-color)', // Change border color when focused
        },
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
        color: 'var(--main-color)', // Change label color when focused
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

const TextInput:React.FC<TextInputProps>=({type='text', defaultValue='', error=false, label, helperText='', onChange})=>{
    if(error){
        return(
            <TextInputStyle id='outlined-error-helper-text' type={type} defaultValue={defaultValue} error label={label} helperText={helperText} size='small' onChange={onChange} ></TextInputStyle>
        );
    }
    return(
        <TextInputStyle id='outlined-error-helper-text' type={type} defaultValue={defaultValue} label={label} helperText={helperText} size='small' onChange={onChange} ></TextInputStyle>
    );
};

export default TextInput;