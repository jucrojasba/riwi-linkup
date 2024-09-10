import { ChangeEvent } from "react";

export interface TextInputProps {
  type?: 'text' | 'number' | 'email' | 'password'| 'url' | 'tel';
  defaultValue?: string | number;
  error?:boolean; //Propiedad de MUI
  required?:boolean; //Propiedad de MUI
  label:string; //Propiedad de MUI - Reemplaza placeholder
  helperText?:string; //Propiedad de MUI
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}