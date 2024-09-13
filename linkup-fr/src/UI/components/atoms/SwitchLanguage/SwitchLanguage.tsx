import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TranslateIcon from "@mui/icons-material/Translate";
import { Style } from "@mui/icons-material";

const LanguageSelector = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (language: string) => {
    setSelectedLanguage(language);
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
        {selectedLanguage}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disablePortal
      >
        <MenuItem onClick={() => handleMenuItemClick("English")}>
          English
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("Spanish")}>
          Spanish
        </MenuItem>
      </Menu>
    </>
  );
};

export default LanguageSelector;
