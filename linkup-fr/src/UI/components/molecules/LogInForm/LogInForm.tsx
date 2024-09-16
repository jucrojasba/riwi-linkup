"use client";
import { Box, Typography } from "@mui/material";
import TextInput from "../../atoms/TextInput/TextInput";
import MainButton from "../../atoms/MainButton/MainButton";
import CustomLink from "../../atoms/CustomLink/CustomLink";
import PasswordInput from "../../atoms/PasswordInput/PasswordInput";
import { useEffect, useState } from "react";
import { ICompanyLogin } from "@/UI/interfaces/Forms";
import { useDarkMode } from "@/global-states/dark-mode";
import { authLoginService } from "@/services/authService";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { CircularLoader } from "../../atoms";
import inputAlert from "../Alert/Alert";
import { useAuthUser } from "@/global-states/authUser";
import useNavigate from "@/utilities/NavigateTo";
import './loginFormStyles.css'
import {saveLocalStorage} from "@/utilities/LocalStorage";
import { useLanguage } from "@/global-states/language-mode";
import CustomIconButton from "../../atoms/IconButton/IconButton";
const CompanyInitialState={
    email:'',
    password:'',
}

function LogInForm():React.ReactNode{
    const[passwordInputError,setPasswordInputError] =useState(false); // This statte change if do bad request the server
    const[companyRegister,setCompanyRegister] =useState<ICompanyLogin>(CompanyInitialState); // States
    const Language = useLanguage((state) => state.language); //true español
    const DarkMode = useDarkMode((state) => state.DarkMode);
    const {data: session, status} = useSession();
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const {setAuthUser} = useAuthUser();
    const navigate = useNavigate();

    // Management change on the inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setCompanyRegister((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
        }));  
    };
    const handleSubmit = async() =>{ // Logic for login with LinkUp
        setLoading(true);
        const data = await authLoginService(companyRegister);
        if(!data){
            setLoading(false);
            inputAlert("Authentication error: The credentials provided are incorrect.", "error");
            return;
        }
        const {name,email,token} = data;
        setAuthUser({name,email,token, role:2}); // Save user on global state
        saveLocalStorage("token",token); //Save token on local storage
        setLoading(false);
        inputAlert("Login successful", "success");
        navigate("/dashboard");
    }

    return(
    <Box
    component='form'
    sx={{display:'flex',flexDirection:'column',gap:'var(--padding-medium)', alignItems:'center',width:'fit-content'}}>
        {loading ? <CircularLoader flag={loading} /> : null} 
        <Typography variant="h2" sx={{color:'var(--main-color)',fontFamily:'var(--main-font)',fontSize:'2rem', fontWeight:'500' }}>{Language?'Bienvenido':'Welcome back'}</Typography>
        <TextInput name="email" type="email" label={Language?"Correo Electrónico":"Email"} required onChange={handleChange} />
        <PasswordInput name="password" label={Language?"Contraseña":"Password"} type="password" required onChange={handleChange} />
        {Language?<CustomLink text="Olvidaste tu contraseña?" href="/recover-password"/>:<CustomLink text="Forgot Password?" href="/recover-password"/>}
        
        <MainButton text={Language?"Iniciar Sesión":"Log In"} onClick={handleSubmit} className="button-login"/>
        <h4 className={DarkMode?"login-separator-dark":"login-separator"}><span>{Language?'Inicia Sesión con:':'Login with:'}</span></h4>
        <Box sx={{display:'flex', gap:'var(--padding-medium)'}}>
            <CustomIconButton icon="google" iconColor="#db4437" backgroundColor="var(--gray-color)" onClick={()=>{}}/>
            <CustomIconButton icon="github" iconColor="black" backgroundColor="var(--gray-color)" onClick={()=>{}}/>
        </Box>
        <Box component={'span'}>
            {DarkMode?
                <Typography variant="body1" sx={{color:'var(--white-color)',fontFamily:'var(--main-font)'}}>
                    {Language?'No tienes una cuenta? ':'Do not have an account? '}
                    {Language?<CustomLink text="Registrate" href="/register"/>:<CustomLink text="Sign up" href="/register"/>}
                </Typography>
                :<Typography variant="body1" sx={{color:'var(--secondary-color)',fontFamily:'var(--main-font)'}}>
                    {Language?'No tienes una cuenta? ':'Do not have an account? '}
                    {Language?<CustomLink text="Registrate" href="/register"/>:<CustomLink text="Sign up" href="/register"/>}
                </Typography>
            }
        </Box>
    </Box>);
};

  
export default LogInForm;

