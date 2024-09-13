'use client';
import { Box, Typography } from "@mui/material";
import CustomLink from "../../atoms/CustomLink/CustomLink";
import MainButton from "../../atoms/MainButton/MainButton";
import SecondaryButton from "../../atoms/SecondaryButton/SecondaryButton";
import SelectLanguage from "../../atoms/SwitchLanguage/SwitchLanguage";
import useNavigate from "@/utilities/NavigateTo";


interface NavbarHomeProps {
  isDarkMode: boolean;
}

const NavbarHome: React.FC<NavbarHomeProps> = ({ isDarkMode }) => {
  const navigate = useNavigate();
  return (
    <Box
      component="nav"
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: "var(--padding-big) 5% 0 3%",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "var(--padding-big)" }}>
        <Box component="span" sx={{ display: "flex", width: "fit-content", alignItems: "center", gap: "5px" }}>
          <Typography
            variant="h1"
            sx={{ fontSize: "1.5rem", color: isDarkMode ? "var(--main-color)" : "var(--paragraph-color)", fontFamily: "var(--main-font)", fontWeight: 500 }}
          >
            Riwi LinkUp
          </Typography>
        </Box>
        <SelectLanguage />
      </Box>

      <Box component="span" sx={{ display: "flex", alignItems: "center", gap: "var(--padding-medium)" }}>
        <CustomLink
          text="About Us"
          href="https://riwi.io/empleadores/"
          target="_blank"
        />
        <CustomLink
          text="Contact Us"
          href="https://riwi.io/empleadores/#Contacto"
          target="_blank"
        />
        <SecondaryButton text="Log In" onClick={() => { navigate('/login') }} />
        <MainButton text="Join Us" onClick={() => {  navigate('/register')}} />
      </Box>
    </Box>
  );
};

export default NavbarHome;
