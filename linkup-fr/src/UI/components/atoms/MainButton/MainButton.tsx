"use client";

import { ButtonProps } from "@/UI/interfaces/Button";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

const MainButtonStyle = styled(Button)(() => ({
  backgroundColor: "var(--main-color)",
  borderRadius: "var(--border-radius-min)",
  textTransform: "none",
  fontFamily: "var(--main-font)",
  minWidth: "fit-content",
  fontSize: "1rem",
}));

const MainButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = "button",
}) => {
  return (
    <MainButtonStyle type={type} variant="contained" onClick={onClick}>
      <SearchIcon />
      {text}
    </MainButtonStyle>
  );
};

export default MainButton;
