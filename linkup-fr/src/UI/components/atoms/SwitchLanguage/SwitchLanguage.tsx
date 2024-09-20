import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TranslateIcon from "@mui/icons-material/Translate";
import { useLanguage } from "@/global-states/language-mode";

interface LanguageSelectorProps {
  showBoxShadow?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ showBoxShadow = false }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { language, setLanguage } = useLanguage();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (language: boolean) => {
    setLanguage(language);
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
        startIcon={<TranslateIcon />}
        style={{
          textTransform: "none",
          backgroundColor: "var(--main-color)",
          color: "var(--white-color)",
          padding: "6px 16px",
          borderRadius: "var(--border-radius-min)",
          boxShadow: showBoxShadow ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none",
          transition: "background-color 0.3s ease",
        }}
        sx={{
          "&:hover": {
            backgroundColor: "var(--main-color)", // Igualar color de fondo
            color: "var(--white-color)", // Color del texto igual al fondo
            boxShadow: showBoxShadow ? "none" : "none",
          },
        }}
      >
        {language ? "Español" : "English"}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disablePortal
      >
        <MenuItem onClick={() => handleMenuItemClick(false)}>
          <img src="./icons/usaflag.jpg" alt="USA Flag" style={{ width: "20px", marginRight: "8px" }} />
          English
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick(true)}>
          <img src="./icons/colflag.png" alt="Colombia Flag" style={{ width: "20px", marginRight: "8px" }} />
          Español
        </MenuItem>
      </Menu>
    </>
  );
};

export default LanguageSelector;
