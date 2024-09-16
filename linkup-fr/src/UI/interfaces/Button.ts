import { ReactElement } from "react";

export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  text?: string | ReactElement;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?:string;
}

export interface IconButtonProps {
  icon:'google'|'github'
  iconColor?:string;
  backgroundColor?:string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?:string;
}