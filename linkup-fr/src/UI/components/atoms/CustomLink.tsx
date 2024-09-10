'use client'

import { Link as MUILink } from '@mui/material';
import { CustomLinkProps } from '@/UI/interfaces/Link';


const CustomLink:React.FC<CustomLinkProps>=({text,href,target=''})=>{
  return(
      <MUILink color='var(--main-color)' href={href} target={target} underline="hover" sx={{width:'fit-content'}}>{text}</MUILink>
  );
};

export default CustomLink;