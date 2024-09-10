"use client";
import { Box, Typography, } from "@mui/material";
import TextInput from "../../atoms/TextInput";
import MainButton from "../../atoms/MainButton";
import CustomLink from "../../atoms/CustomLink";
import PasswordInput from "../../atoms/PasswordInput";

const LogInForm:React.FC=()=>{
    return(
        <Box component='form'onSubmit={()=>{console.log("ok")}} sx={{display:'flex',flexDirection:'column',gap:'var(--padding-big)', alignItems:'center',width:'fit-content'}}>
            <Typography variant="h2" sx={{color:'var(--main-color)',fontFamily:'var(--main-font)',fontSize:'2rem', fontWeight:'500' }}>Welcome back</Typography>
            <TextInput label="Email" required onChange={()=>{}}></TextInput>
            <PasswordInput label="Password" type="password" required onChange={()=>{}}></PasswordInput>
            <MainButton text="Log In" onClick={()=>{}}></MainButton>
            <CustomLink text="Forgot Password?" href="/recover-password"></CustomLink>
            <Box component={'span'}>
                <Typography variant="body1" sx={{color:'var(--secondary-color)',fontFamily:'var(--main-font)'}}>Do not have an account? <CustomLink text="Sign up" href="/signup"></CustomLink></Typography>
            </Box>
        </Box>
    );
};
  
export default LogInForm;