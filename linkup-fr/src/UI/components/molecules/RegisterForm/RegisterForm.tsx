"use client";
import { Box, Typography, } from "@mui/material";
import TextInput from "../../atoms/TextInput/TextInput";
import MainButton from "../../atoms/MainButton/MainButton";
import CustomLink from "../../atoms/CustomLink/CustomLink";
import PasswordInput from "../../atoms/PasswordInput/PasswordInput";
import { useEffect, useState } from "react";
import { ICompanyRegister } from "@/UI/interfaces/Forms";
import saveCredentials from "@/utilities/credentials";
import { authRegisterService } from "@/services/authService";
import { CircularLoader } from "../../atoms";

const CompanyInitialState={
    name: '',
    email:'',
    password:'',
    confirmPassword:'',
    sector:''
}

const RegisterForm:React.FC=()=>{
    const[passwordInputError,setPasswordInputError] =useState(false);
    const[companyRegister,setCompanyRegister] =useState<ICompanyRegister>(CompanyInitialState);
    const [loading, setLoading] = useState<boolean>(false);

    function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
        setCompanyRegister((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }));  
    };

    const handleSubmit = async()=>{
        setLoading(true);
        const {sector} = companyRegister;
        const data = await authRegisterService(companyRegister, sector);
        if(!data){
            //Call modal for error - Is necesary all params
            return;
        }
        const {name,email,token} = data;
        saveCredentials({name,email,token});
    }

    useEffect(() => {
        if(companyRegister.password!==companyRegister.confirmPassword){
            setPasswordInputError(true)
        }else{
            setPasswordInputError(false)
        };
      }, [companyRegister]);

    return(
        <Box component='form' onSubmit={()=>{console.log("ok")}} sx={{display:'flex',flexDirection:'column',gap:'var(--padding-big)', alignItems:'center',width:'fit-content'}}>
            {loading?<CircularLoader flag={loading}/>:null}
            <Typography variant="h2" sx={{color:'var(--main-color)',fontFamily:'var(--main-font)',fontSize:'2rem', fontWeight:'500' }}>Get Started</Typography>
            <TextInput name="name" label="Company Name" required onChange={handleChange}></TextInput>
            <TextInput name="email" type="email" label="Email" required onChange={handleChange}></TextInput>
            {passwordInputError?<PasswordInput name="password" label="Password" type="password" required error helperText="Las contraseñas no coinciden" onChange={handleChange}></PasswordInput>:<PasswordInput name="password" label="Password" type="password" required onChange={handleChange}></PasswordInput>}
            {passwordInputError?<PasswordInput name="confirmPassword" label="Confirm Password" type="password" required error helperText="Las contraseñas no coinciden" onChange={handleChange}></PasswordInput>:<PasswordInput name="confirmPassword" label="Confirm Password" type="password" required onChange={handleChange}></PasswordInput>}
            <TextInput name="sector" label="Sector" helperText="Esto va a ser un select conectado a la bd" required onChange={handleChange}></TextInput>
            <MainButton text="Register" onClick={handleSubmit}></MainButton>
            <Box component={'span'}>
                <Typography variant="body1" sx={{color:'var(--secondary-color)',fontFamily:'var(--main-font)'}}>Already have an account? <CustomLink text="Log In" href="/login"></CustomLink></Typography>
            </Box>
        </Box>
    );
};

export default RegisterForm;