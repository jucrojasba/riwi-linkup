"use client";

import ButtonMore from "@/UI/components/atoms/ButtonMore/ButtonMore";
import CustomLink from "@/UI/components/atoms/CustomLink/CustomLink";
import MainButton from "@/UI/components/atoms/MainButton/MainButton";
import PasswordInput from "@/UI/components/atoms/PasswordInput/PasswordInput";
import SecondaryButton from "@/UI/components/atoms/SecondaryButton/SecondaryButton";
import TextInput from "@/UI/components/atoms/TextInput/TextInput";
import { CircularLoader, LinearLoader } from "@/UI/components/atoms/loaders/Loaders";
import LogInForm from "@/UI/components/molecules/LogInForm/LogInForm";
import RegisterForm from "@/UI/components/molecules/RegisterForm/RegisterForm";
import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function TestView() {
  return (
    <main>
      <Box sx={{padding:'40px'}}>
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

    </main>
  );
}
