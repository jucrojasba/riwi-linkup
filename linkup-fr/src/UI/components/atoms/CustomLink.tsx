'use client'

import { Link as MUILink } from '@mui/material';
import { CustomLinkProps } from '@/UI/interfaces/Link';


const CustomLink:React.FC<CustomLinkProps>=({text,href})=>{
  return(
      <MUILink color='var(--main-color)' href={href} underline="hover">{text}</MUILink>
  );
};

export default CustomLink;