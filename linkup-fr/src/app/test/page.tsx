"use client";

import ButtonMore from "@/UI/components/atoms/ButtonMore/ButtonMore";
import CustomLink from "@/UI/components/atoms/CustomLink/CustomLink";
import MainButton from "@/UI/components/atoms/MainButton/MainButton";
import PasswordInput from "@/UI/components/atoms/PasswordInput/PasswordInput";
import SecondaryButton from "@/UI/components/atoms/SecondaryButton/SecondaryButton";
import TextInput from "@/UI/components/atoms/TextInput/TextInput";
import { CircularLoader, LinearLoader } from "@/UI/components/atoms/loaders/Loaders";
import LogInForm from "@/UI/components/molecules/LogInForm/LogInForm";
import { Box } from "@mui/material";

export default function TestView() {
  return (
    <main>
      <Box sx={{padding:'40px'}}>
        <MainButton text="Ejemplo" onClick={()=>{}}></MainButton>
        <SecondaryButton text="Secundario" onClick={()=>{}}></SecondaryButton>
        <ButtonMore></ButtonMore>
        <TextInput label="Nombre" onChange={()=>{}}></TextInput>
        <TextInput label="Required" required onChange={()=>{}}></TextInput>
        <PasswordInput label="Password" type='password' onChange={()=>{}} error helperText="Contraseña Incorrecta"></PasswordInput>
        <TextInput label="Celular" type="number" onChange={()=>{}}></TextInput>
        <CustomLink text="About Us" href="/aboutus"></CustomLink>
        <CircularLoader flag={true}/>
        <LinearLoader flag={true}/>
      </Box>

      <LogInForm/>

      <MainButton text="Ejemplo" onClick={() => {}}></MainButton>
      <SecondaryButton text="Secundario" onClick={() => {}}></SecondaryButton>
      <TextInput label="Nombre" onChange={() => {}}></TextInput>
      <TextInput
        label="Password"
        type="password"   
        onChange={() => {}}
        error
        helperText="Contraseña Incorrecta"
      ></TextInput>
      <TextInput label="Celular" type="number" onChange={() => {}}></TextInput>
      <CustomLink text="About Us" href="/aboutus"></CustomLink>
      <CircularLoader flag={true} />
      <LinearLoader flag={true} />
      <ButtonMore></ButtonMore>

    </main>
  );
}
