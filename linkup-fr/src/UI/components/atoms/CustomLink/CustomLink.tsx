'use client'

import { Link as MUILink } from '@mui/material';
import { CustomLinkProps } from '@/UI/interfaces/Link';

const CustomLink: React.FC<CustomLinkProps> = ({ text, href, target = '', onClick }) => {
  return (
    <MUILink
      color='var(--main-color)'
      href={href}
      target={target}
      underline="none"
      onClick={onClick}
      sx={{
        minWidth: 'fit-content',
        position: 'relative',
        display: 'inline-block',
        cursor: 'pointer',
        '&:hover::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          bottom: -5,
          width: '100%',
          height: '2px',
          backgroundColor: 'var(--main-color)',
        }
      }}
    >
      {text}
    </MUILink>
  );
};

export default CustomLink;

