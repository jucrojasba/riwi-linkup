"use client";
import { Box, Typography, } from "@mui/material";
import TextInput from "../../atoms/TextInput/TextInput";
import MainButton from "../../atoms/MainButton/MainButton";
import CustomLink from "../../atoms/CustomLink/CustomLink";
import PasswordInput from "../../atoms/PasswordInput/PasswordInput";
import { useState } from "react";
import { ICompanyLogin } from "@/UI/interfaces/Forms";
import { useDarkMode } from "@/global-states/dark-mode";

const CompanyInitialState={
    email:'',
    password:'',
}

const LogInForm:React.FC=()=>{

    const[passwordInputError,setPasswordInputError] =useState(false); // Este estado cambia si se hacen malas peticiones al servidor
    const[companyRegister,setCompanyRegister] =useState<ICompanyLogin>(CompanyInitialState);
    const DarkMode = useDarkMode((state) => state.DarkMode);

    function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
        setCompanyRegister((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }));  
    };

    return(
        <Box component='form'onSubmit={()=>{console.log("ok")}} sx={{display:'flex',flexDirection:'column',gap:'var(--padding-big)', alignItems:'center',width:'fit-content'}}>
            <Typography variant="h2" sx={{color:'var(--main-color)',fontFamily:'var(--main-font)',fontSize:'2rem', fontWeight:'500' }}>Welcome back</Typography>
            <TextInput name="email" type="email" label="Email" required onChange={handleChange}></TextInput>
            <PasswordInput name="password" label="Password" type="password" required onChange={handleChange}></PasswordInput>
            <MainButton text="Log In" onClick={()=>{}}></MainButton>
            <CustomLink text="Forgot Password?" href="/recover-password"></CustomLink>
            <Box component={'span'}>
                {DarkMode?<Typography variant="body1" sx={{color:'var(--white-color)',fontFamily:'var(--main-font)'}}>Do not have an account? <CustomLink text="Sign up" href="/register"></CustomLink></Typography>:<Typography variant="body1" sx={{color:'var(--secondary-color)',fontFamily:'var(--main-font)'}}>Do not have an account? <CustomLink text="Sign up" href="/register"></CustomLink></Typography>}
            </Box>
        </Box>
    );
};
  
export default LogInForm;