"use client";

import ButtonMore from "@/UI/components/atoms/ButtonMore/ButtonMore";
import CustomLink from "@/UI/components/atoms/CustomLink";
import MainButton from "@/UI/components/atoms/MainButton";
import SecondaryButton from "@/UI/components/atoms/SecondaryButton";
import TextInput from "@/UI/components/atoms/TextInput";
import {
  CircularLoader,
  LinearLoader,
} from "@/UI/components/atoms/loaders/Loaders";

export default function TestView() {
  return (
    <main>
      <br />

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
