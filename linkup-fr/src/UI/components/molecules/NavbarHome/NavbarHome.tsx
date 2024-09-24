'use client';
import { Box, Typography } from "@mui/material";
import CustomLink from "../../atoms/CustomLink/CustomLink";
import MainButton from "../../atoms/MainButton/MainButton";
import SecondaryButton from "../../atoms/SecondaryButton/SecondaryButton";
import SelectLanguage from "../../atoms/SwitchLanguage/SwitchLanguage";
import useNavigate from "@/utilities/NavigateTo";
import { useLanguage } from "@/global-states/language-mode";

// Defining the props interface for the NavbarHome component
interface NavbarHomeProps {
  isDarkMode: boolean;
}

// Defining the NavbarHome component
const NavbarHome: React.FC<NavbarHomeProps> = ({ isDarkMode }) => {
  // Importing the navigate function from the useNavigate utility
  const navigate = useNavigate();

  // Accessing the language state from the useLanguage hook
  const Language = useLanguage((state) => state.language); // true español

  // Rendering the home page navbar
  return (
    <Box
      // Setting the component to be a nav element
      component="nav"
      // Applying styles to the navbar
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
      {/* Left side of the navbar */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "var(--padding-big)" }}>
        {/* Riwi LinkUp logo */}
        <Box
          component="span"
          sx={{ display: "flex", width: "fit-content", alignItems: "center", gap: "5px" }}
        >
          <Typography
            variant="h1"
            style={{
              fontSize: "1.5rem",
              color: isDarkMode ? "var(--main-color)" : "var(--paragraph-color)",
              fontFamily: "var(--main-font)",
              fontWeight: 500,
              cursor: "pointer" // Adding a pointer cursor
            }}
            onClick={() => { navigate('/') }} // Handling the click event to navigate to the home page
          >
            Riwi LinkUp
          </Typography>
        </Box>
        {/* Language selection */}
        <SelectLanguage />
      </Box>

      {/* Right side of the navbar */}
      <Box component="span" sx={{ display: "flex", alignItems: "center", gap: "var(--padding-medium)" }}>
        {/* Home link */}
        <CustomLink
          text={Language ? "Inicio" : "Home"}
          target="_blank"
          onClick={() => { navigate('/') }}
        />
        {/* About Us link */}
        <CustomLink
          text={Language ? "Quiénes somos?" : "About Us"}
          href="https://riwi.io/empleadores/"
          target="_blank"
        />
        {/* Contact Us link */}
        <CustomLink
          text={Language ? "Contáctanos" : "Contact Us"}
          href="https://riwi.io/empleadores/#Contacto"
          target="_blank"
        />
        {/* Log In button */}
        <SecondaryButton
          text={Language ? "Iniciar Sesión" : "Log In"}
          onClick={() => { navigate('/login') }}
        />
        {/* Join Us button */}
        <MainButton
          text={Language ? "Regístrate" : "Join Us"}
          onClick={() => { navigate('/register') }}
        />
      </Box>
    </Box>
  );
};

export default NavbarHome;