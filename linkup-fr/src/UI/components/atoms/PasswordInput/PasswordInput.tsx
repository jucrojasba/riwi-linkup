"use client";

import React, { useState } from "react";
import { TextInputProps } from "@/UI/interfaces/Input";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";

const PasswordInputStyle = styled(TextField)(() => ({
    textTransform: "none",
    fontFamily: "var(--main-font)",
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
        borderColor: "var(--main-color)", // Change border color
        },
        "&:hover fieldset": {
        borderColor: "var(--main-color)", // Change border color on hover
        },
        "&.Mui-focused fieldset": {
        borderColor: "var(--main-color)", // Change border color when focused
        },
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
        color: "var(--main-color)", // Change label color when focused
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

const PasswordInput: React.FC<TextInputProps> = ({
    type = "text",
    name,
    defaultValue = "",
    error = false,
    required = false,
    label,
    helperText = "",
    onChange,
}) => {
    const [showPassword,setShowPassword]=useState(false);
    const handleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <PasswordInputStyle
            id="outlined-error-helper-text"
            name={name}
            type={type === "password" && !showPassword ? "password" : "text"}
            defaultValue={defaultValue}
            label={label}
            error={error}
            required={required}
            helperText={helperText}
            size="small"
            onChange={onChange}
            sx={{width:'250px'}}
            InputProps={{
                endAdornment: type === "password" && (
                    <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPassword}
                        edge="end"
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </InputAdornment>
                ),
            }}
        ></PasswordInputStyle>
    );
};

export default PasswordInput;
