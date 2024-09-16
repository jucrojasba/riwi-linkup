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
const CompanyInitialState={
    email:'',
    password:'',
}

function LogInForm():React.ReactNode{
    const[passwordInputError,setPasswordInputError] =useState(false); // This statte change if do bad request the server
    const[companyRegister,setCompanyRegister] =useState<ICompanyLogin>(CompanyInitialState); // States
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
    sx={{display:'flex',flexDirection:'column',gap:'var(--padding-big)', alignItems:'center',width:'fit-content'}}>
        {loading ? <CircularLoader flag={loading} /> : null} 
        <Typography variant="h2" sx={{color:'var(--main-color)',fontFamily:'var(--main-font)',fontSize:'2rem', fontWeight:'500' }}>Welcome back</Typography>
        <TextInput name="email" type="email" label="Email" required onChange={handleChange} />
        <PasswordInput name="password" label="Password" type="password" required onChange={handleChange} />
        <CustomLink text="Forgot Password?" href="/recover-password"></CustomLink>
        <MainButton text={"Log In"} onClick={handleSubmit} className="button-login"/>
        <Typography variant="body1" sx={{color:'var(--secondary-color)',fontFamily:'var(--main-font)'}}>- Or Login with -</Typography>
        <Box sx={{display:'flex', gap:'var(--padding-big)'}}>
            <MainButton text={<GoogleIcon />} onClick={()=>signIn("google")} />
            <MainButton text={<GitHubIcon />} onClick={()=>signIn("github")} />
        </Box>
        <Box component={'span'}>
            {DarkMode?
            <Typography variant="body1" sx={{color:'var(--white-color)',fontFamily:'var(--main-font)'}}>
                Do not have an account? 
                <CustomLink text="Sign up" href="/register">
                </CustomLink>
            </Typography>
            :<Typography variant="body1" sx={{color:'var(--secondary-color)',fontFamily:'var(--main-font)'}}>
                Do not have an account? 
                <CustomLink text="Sign up" href="/register">
                </CustomLink>
            </Typography>
            }
        </Box>
    </Box>);
};

  
export default LogInForm;

