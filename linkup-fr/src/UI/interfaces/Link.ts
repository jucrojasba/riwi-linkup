import { MouseEventHandler } from "react";

// Props for the CustomLink component
export interface CustomLinkProps {
    text: string;                         // Text to display for the link
    href?: string;                       // Optional URL the link points to
    target?: string;                     // Optional target attribute for the link (e.g., "_blank")
    onClick?: MouseEventHandler<HTMLAnchorElement>; // Optional click event handler
}
