"use client";
import { Box, SelectChangeEvent, Typography, } from "@mui/material";
import TextInput from "../../atoms/TextInput/TextInput";
import MainButton from "../../atoms/MainButton/MainButton";
import CustomLink from "../../atoms/CustomLink/CustomLink";
import PasswordInput from "../../atoms/PasswordInput/PasswordInput";
import { useEffect, useState } from "react";
import { ICompanyRegister } from "@/UI/interfaces/Forms";
import { CircularLoader } from "../../atoms";
import { useLanguage } from "@/global-states/language-mode";
import { useDarkMode } from "@/global-states/dark-mode";
import CustomIconButton from "../../atoms/IconButton/IconButton";
import { inputAlert } from "../Alert/Alert";
import { saveLocalStorage } from "@/utilities/LocalStorage";
import { signIn, useSession } from "next-auth/react";
import useNavigate from "@/utilities/NavigateTo";
import { authRegisterService } from "@/services";
import { registerProviderService } from "@/services/authService";
import { useAuthUser } from "@/global-states/authUser";
import { emailService } from "@/services/emailService";
import { generateTextEmailCorrect, generateTextEmailIncorrect } from "@/utilities/EmailText";
import verifyData from "@/utilities/verifyData";
import SelectOptions from "../../atoms/Select/Select";
import "./registerFormStyles.css";
import { ISector, ISectors } from "@/UI/interfaces/SectorInterface";
import getSectorsService from "@/services/sectorService";

const RegisterForm:React.FC=()=>{
    const[passwordInputError,setPasswordInputError] =useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const Language = useLanguage((state) => state.language); //true español
    const DarkMode = useDarkMode((state) => state.DarkMode);
    const {data: session, status} = useSession();
    const navigate = useNavigate();
    const {setAuthUser} = useAuthUser();

    const CompanyInitialState: ICompanyRegister ={
        name: '',
        email:'',
        password:'',
        confirmPassword:'',
        phone:0,
        sector:''
    };
    const initialSectorState: ISector = {
        id: 0,
        name: ""
    }
    const initialSectorsState: ISectors = {
        sectors: [initialSectorState]
    }
    const[companyRegister,setCompanyRegister] =useState<ICompanyRegister>(CompanyInitialState);
    const [sectors,setSectors] = useState<ISectors>(initialSectorsState);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent) => {
        const {name,value} = e.target;
        setCompanyRegister({...companyRegister,[name]:value});
        console.log(companyRegister)
    }

    const handleSubmit = async()=>{
        setLoading(true);
        const {name,email,password, phone, sector} = companyRegister;
        console.log(name,email,password,phone,sector);
        const data = await authRegisterService({name,email,password, phoneNumber: phone.toString(), sectorId: 1});
        if(!data){
            setLoading(false);
            inputAlert("Error to login", "error")
            console.log({message: "Error, show modal"});
            return;
        }
        console.log(data);
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

    useEffect(()=>{
        const getSectors = async() =>{
            const sectors = await getSectorsService();
            if(sectors && "message" in sectors)return;
            if(!sectors) return;
            setSectors(sectors);
        };
        getSectors();
    }, []);

    useEffect(()=>{
        if(status === "authenticated"){
            const registerUserProvider = async()=>{
                const {user} = session;
                if(!user) return ({message: "Errow with the session"});
                const name = user.name!;
                const email = user.email!;
                const image = user.image!;
                const data = await registerProviderService({name,email,image});
                if(data && "message" in data){
                    inputAlert("Error to register. User Exists", "error");
                    const textEmailGenerate = generateTextEmailIncorrect("Access problem - RiwiLinkUp", name, email);
                    const mail = await emailService({
                        email,
                        emailLinkUp:"riwilinkup@gmail.com", 
                        subject: "Access problem - RiwiLinkUp", 
                        text: textEmailGenerate,});
                    console.log(mail);  
                    return;
                }
                const token = data.token!;
                const roleId = data.roleId!;
                const password = data.password!;
                const provider:string = localStorage.getItem("provider")!;
                saveLocalStorage("token", token);
                saveLocalStorage("roleId", roleId);
                setAuthUser({name,email,token, role:roleId, provider});
                const textEmailGenerate = generateTextEmailCorrect("Successful register to RiwiLinkUp", name, email,password);
                const mail = await emailService({
                    email,
                    emailLinkUp:"riwilinkup@gmail.com", 
                    subject: "Welcome to RiwiLinkUp", 
                    text: textEmailGenerate,
                });
                console.log(mail);
                inputAlert("Registration successful. Check your email", "success");
                navigate("/dashboard");
            }
            registerUserProvider();
        }
    },[status]);

    const sigInProvider = (nameProvider: string, valueProvider: string) =>{
        saveLocalStorage("provider",valueProvider);
        signIn(nameProvider);
    }

    return(
        <Box 
        component='form' 
        onSubmit={()=>{console.log("ok")}} 
        sx={{
            display:'flex',
            flexDirection:'column',
            gap:'var(--padding-big)', 
            alignItems:'center',
            width:'25%',
        }}>
            {loading?<CircularLoader flag={loading}/>:null}
            <Typography 
            variant="h2" 
            sx={{
                color:'var(--main-color)',
                fontFamily:'var(--main-font)',
                fontSize:'2rem', 
                fontWeight:'500' 
                }}>{Language?'Registrate':'Get Started'}</Typography>
            <div className="form-input-name-email">     
            <TextInput 
                name="name" 
                label={Language
                ?"Nombre de la compañía"
                :"Company Name"} 
                required 
                onChange={handleChange} 
                />
                <TextInput 
                name="email" 
                type="email" 
                label={Language?"Correo Electrónico":"Email"} 
                required 
                onChange={handleChange}  />
            </div>
            {passwordInputError?
            <PasswordInput 
            name="password" 
            label={Language?
            "Contraseña"
            :"Password"
            } 
            type="password" 
            required error 
            helperText={Language
            ?"Las contraseñas no coinciden"
            :"Passwords doesn't match"
            } 
            onChange={handleChange} />
            :
            <PasswordInput 
            name="password" 
            label={Language?
            "Contraseña":
            "Password"} 
            type="password" 
            required 
            onChange={handleChange} />}
            {passwordInputError?<PasswordInput name="confirmPassword" label={Language?"Confirmar contraseña":"Confirm password"} type="password" required error helperText={Language?"Las contraseñas no coinciden":"Passwords doesn't match"} onChange={handleChange} />:<PasswordInput name="confirmPassword" label={Language?"Confirmar contraseña":"Confirm password"} type="password" required onChange={handleChange} />}
            <TextInput name="phone" label={Language?"Número de teléfono":"Phone Number"} onChange={handleChange} />
            <SelectOptions
            label={Language?"Sectores":"Sectors"}
            values={["hola"]}
            onChange={(e: SelectChangeEvent) =>handleChange(e)}
            value={companyRegister.sector}
            name={"sector"}>
            </SelectOptions>
            <MainButton text={Language?"Registrarme":"Register"} onClick={handleSubmit} className="mainButton" />
            <Box component={'span'}>
                <Typography variant="body1" sx={{color:'var(--secondary-color)',fontFamily:'var(--main-font)'}}>{Language?'Ya tienes una cuenta?':'Already have an account?'} <CustomLink text={Language?"Iniciar Sesión":"Log In"} href="/login"></CustomLink></Typography>
            </Box>
            <Box sx={{display:'flex', gap:'var(--padding-big)'}}>
                <CustomIconButton icon="google" iconColor="#db4437" backgroundColor="var(--gray-color)" onClick={()=>sigInProvider("google", "google")}/>
                <CustomIconButton icon="github" iconColor="black" backgroundColor="var(--gray-color)" onClick={()=>sigInProvider("github", "github")}/>
            </Box>
        </Box>
    );
};

export default RegisterForm;