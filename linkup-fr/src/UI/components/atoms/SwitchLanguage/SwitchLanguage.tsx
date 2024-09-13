import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TranslateIcon from "@mui/icons-material/Translate";
import { Style } from "@mui/icons-material";
import { useLanguage } from "@/global-states/language-mode";

const LanguageSelector = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {language, setLanguage} = useLanguage();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (language: boolean) => {
    setLanguage(language);
    setAnchorEl(null);
    console.log(language);
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
        }}
      >
        {language? "Español":"English"}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disablePortal
      >
        <MenuItem onClick={() => handleMenuItemClick(false)}>
        🇺🇸 English
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick(true)}>
        🇨🇴 Español
        </MenuItem>
      </Menu>
    </>
  );
};

export default LanguageSelector;