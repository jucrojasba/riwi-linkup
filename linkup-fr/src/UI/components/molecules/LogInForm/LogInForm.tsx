"use client";
import { Box, Typography, } from "@mui/material";
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
import saveCredentials from "@/utilities/credentials";
import { CircularLoader } from "../../atoms";
const CompanyInitialState={
    email:'',
    password:'',
}

function LogInForm():React.ReactNode{
    const[passwordInputError,setPasswordInputError] =useState(false); // Este estado cambia si se hacen malas peticiones al servidor
    const[companyRegister,setCompanyRegister] =useState<ICompanyLogin>(CompanyInitialState);
    const DarkMode = useDarkMode((state) => state.DarkMode);
    const {data: session, status} = useSession();
    const [loading, setLoading] = useState<boolean>(false);

    function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    const router = useRouter();
    const handleChange  = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setCompanyRegister((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
        }));  
    };
    const handleSubmit = async() =>{ // Logic for login with LinkUp
        console.log(companyRegister);
        setLoading(true);
        const data = await authLoginService(companyRegister);
        if(!data){
            //Call modal for error - Is necesary all params
            console.log("Show modal error");
            return;
        }
        const {name,email,token} = data;
        saveCredentials({name,email,token});
        router.push("/company");
    }

    useEffect(()=>{
        if(status === "authenticated"){
            localStorage.setItem("session", JSON.stringify(session));
            router.push("/company");
        }
    }, [status,router])
    return(
    <Box
    component='form'
    sx={{display:'flex',flexDirection:'column',gap:'var(--padding-big)', alignItems:'center',width:'fit-content'}}>
        {loading ? <CircularLoader flag={loading} /> : null} 
        <Typography variant="h2" sx={{color:'var(--main-color)',fontFamily:'var(--main-font)',fontSize:'2rem', fontWeight:'500' }}>Welcome back</Typography>
        <TextInput name="email" type="email" label="Email" required onChange={handleChange} />
        <PasswordInput name="password" label="Password" type="password" required onChange={handleChange} />
        <CustomLink text="Forgot Password?" href="/recover-password"></CustomLink>
        <MainButton text={"Log In"} onClick={handleSubmit} />
        <Typography variant="body1" sx={{color:'var(--secondary-color)',fontFamily:'var(--main-font)'}}>- Or Login with -</Typography>
        <Box sx={{display:'flex', gap:'var(--padding-big)'}}>
            <MainButton text={<GoogleIcon />} onClick={()=>signIn("google")} />
            <MainButton text={<GitHubIcon />} onClick={()=>signIn("github")} />
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
    </Box>
);
};

  
export default LogInForm;