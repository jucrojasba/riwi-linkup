"use client";
import MobileNavbar from "@/UI/components/molecules/MobileNavbar/MobileNavbar";
import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ButtonMore, CircularLoader, CustomLink, LinearLoader, MainButton, PasswordInput, SecondaryButton, TextInput } from "@/UI/components/atoms";
import { RegisterForm } from "@/UI/components/molecules";


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
