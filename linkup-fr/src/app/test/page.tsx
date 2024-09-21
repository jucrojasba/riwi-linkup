"use client";
import MobileNavbar from "@/UI/components/molecules/MobileNavbar/MobileNavbar";
import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ButtonMore, CircularLoader, CustomLink, LinearLoader, MainButton, PasswordInput, SecondaryButton, TextInput } from "@/UI/components/atoms";
import { RegisterForm } from "@/UI/components/molecules";
import CustomIconButton from "@/UI/components/atoms/IconButton/IconButton";
import ChatBot from "@/UI/components/atoms/ChatBot/ChatBot";
import { useDarkMode } from "@/global-states/dark-mode";
import { useLanguage } from "@/global-states/language-mode";
import AuthenticatedMenuToggle from "@/UI/components/molecules/AuthenticatedMenuToggle/AuthenticatedMenuToggle";


export default function TestView() {
  const DarkMode = useDarkMode((state) => state.DarkMode);
  const language = useLanguage((state) => state.language);
  return (
    <main>
       {/* <Box sx={{padding:'40px'}}>
        <MainButton text={<SearchIcon />} onClick={()=>{}}></MainButton>
        <SecondaryButton text="Secundario" onClick={()=>{}}></SecondaryButton>
        <ButtonMore></ButtonMore>
        <TextInput name="" label="Nombre" onChange={()=>{}}></TextInput>
        <TextInput name="" label="Required" required onChange={()=>{}}></TextInput>
        <PasswordInput name="" label="Password" type='password' onChange={()=>{}} error helperText="Contraseña Incorrecta"></PasswordInput>
        <TextInput name="" label="Celular" type="number" onChange={()=>{}}></TextInput>
        <CustomLink text="About Us" href="/aboutus"></CustomLink>
        <CircularLoader flag={true}/>
        <LinearLoader flag={true}/>
      </Box>
      <RegisterForm/>
      <CustomIconButton icon="google" iconColor="#db4437" backgroundColor="var(--gray-color)" onClick={()=>{}}></CustomIconButton>
      <CustomIconButton icon="github" iconColor="black" backgroundColor="var(--gray-color)" onClick={()=>{}}></CustomIconButton>
      <RegisterForm/>  */}
      {/* <MobileNavbar isDarkMode={DarkMode} language={language}/> */}
      <AuthenticatedMenuToggle language={language}/>
    </main>
  );
}
