import { ReactElement } from "react";

export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  text?: string | ReactElement;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?:string;
}