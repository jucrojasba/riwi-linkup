import { MouseEventHandler } from "react";

export interface CustomLinkProps {
    text: string;
    href?: string;
    target?:string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
  }