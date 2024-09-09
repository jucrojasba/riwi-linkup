'use client'

import CustomLink from "@/UI/components/atoms/CustomLink";
import MainButton from "@/UI/components/atoms/MainButton";
import SecondaryButton from "@/UI/components/atoms/SecondaryButton";
import TextInput from "@/UI/components/atoms/TextInput";
import { CircularLoader, LinearLoader } from "@/UI/components/atoms/loaders/Loaders";
import LogInForm from "@/UI/components/molecules/LogInForm/LogInForm";
import { Box } from "@mui/material";

export default function TestView() {
  return (
    <main>
      <Box sx={{padding:'40px'}}>
        <MainButton text="Ejemplo" onClick={()=>{}}></MainButton>
        <SecondaryButton text="Secundario" onClick={()=>{}}></SecondaryButton>
        <TextInput label="Nombre" onChange={()=>{}}></TextInput>
        <TextInput label="Required" required onChange={()=>{}}></TextInput>
        <TextInput label="Password" type="password" onChange={()=>{}} error helperText="Contraseña Incorrecta"></TextInput>
        <TextInput label="Celular" type="number" onChange={()=>{}}></TextInput>
        <CustomLink text="About Us" href="/aboutus"></CustomLink>
        <CircularLoader flag={true}/>
        <LinearLoader flag={true}/>
      </Box>
      <LogInForm/>
    </main>
  );
}
