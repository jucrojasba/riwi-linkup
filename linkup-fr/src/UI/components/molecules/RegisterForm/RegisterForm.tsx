    "use client";
import { Box, SelectChangeEvent, Typography, } from "@mui/material";
import TextInput from "../../atoms/TextInput/TextInput";
import MainButton from "../../atoms/MainButton/MainButton";
import CustomLink from "../../atoms/CustomLink/CustomLink";
import PasswordInput from "../../atoms/PasswordInput/PasswordInput";
import { useEffect, useState } from "react";
import { ICompanyRegister } from "@/UI/interfaces/Forms";
import { authRegisterService } from "@/services/authService";
import { CircularLoader } from "../../atoms";
import {SelectOptions} from "../../atoms";
import { LanguageSharp, PanoramaHorizontalSelectOutlined } from "@mui/icons-material";
import { useLanguage } from "@/global-states/language-mode";
import { useDarkMode } from "@/global-states/dark-mode";

const CompanyInitialState={
    name: '',
    email:'',
    password:'',
    confirmPassword:'',
    phone:0,
    sector:''
}

const RegisterForm:React.FC=()=>{
    const[passwordInputError,setPasswordInputError] =useState(false);
    const[companyRegister,setCompanyRegister] =useState<ICompanyRegister>(CompanyInitialState);
    const [loading, setLoading] = useState<boolean>(false);
    const Language = useLanguage((state) => state.language); //true español
    const DarkMode = useDarkMode((state) => state.DarkMode);

    function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
        setCompanyRegister((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }));  
    };
    function handleChangeSelect (e:SelectChangeEvent){
        setCompanyRegister((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async()=>{
        setLoading(true);
        const {name,email,password, phone, sector} = companyRegister;
        const data = await authRegisterService({name,email,password, phone, sector});
        if(!data){
            //Call modal for error - Is necesary all params
            console.log({message: "Error, show modal"});
            return;
        }
        // const {name,email,token} = data;
        // saveCredentials({name,email,token});
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
            <Typography variant="h2" sx={{color:'var(--main-color)',fontFamily:'var(--main-font)',fontSize:'2rem', fontWeight:'500' }}>{Language?'Registrate':'Get Started'}</Typography>
            <TextInput name="name" label={Language?"Nombre de la compañía":"Company Name"} required onChange={handleChange} />
            <TextInput name="email" type="email" label={Language?"Correo Electrónico":"Email"} required onChange={handleChange} />
            {passwordInputError?<PasswordInput name="password" label={Language?"Contraseña":"Password"} type="password" required error helperText={Language?"Las contraseñas no coinciden":"Passwords doesn't match"} onChange={handleChange}></PasswordInput>:<PasswordInput name="password" label={Language?"Contraseña":"Password"} type="password" required onChange={handleChange}></PasswordInput>}
            {passwordInputError?<PasswordInput name="confirmPassword" label={Language?"Confirmar contraseña":"Confirm password"} type="password" required error helperText={Language?"Las contraseñas no coinciden":"Passwords doesn't match"} onChange={handleChange}></PasswordInput>:<PasswordInput name="confirmPassword" label={Language?"Confirmar contraseña":"Confirm password"} type="password" required onChange={handleChange}></PasswordInput>}
            <TextInput name="phone" label={Language?"Número de teléfono":"Phone Number"} onChange={handleChange} />
            <SelectOptions
            label={Language?"Sectores":"Sectors"}
            values={Language?["Tecnología", "Salud", "Educación"]:["Tecnology", "Health", "Education"]}
            onchange={handleChangeSelect}
            value={companyRegister.sector}
            name={"sector"}>
            </SelectOptions>
            <MainButton text={Language?"Registrarme":"Register"} onClick={handleSubmit} />
            <Box component={'span'}>
                <Typography variant="body1" sx={{color:'var(--secondary-color)',fontFamily:'var(--main-font)'}}>{Language?'Ya tienes una cuenta?':'Already have an account?'} <CustomLink text={Language?"Iniciar Sesión":"Log In"} href="/login"></CustomLink></Typography>
            </Box>
        </Box>
    );
};

export default RegisterForm;