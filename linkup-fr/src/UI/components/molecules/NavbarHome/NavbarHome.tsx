import { Box, Typography } from "@mui/material";
import CustomLink from "../../atoms/CustomLink/CustomLink";
import Image from "next/image";
import MainButton from "../../atoms/MainButton/MainButton";
import SecondaryButton from "../../atoms/SecondaryButton/SecondaryButton";
import SelectLanguage from "../../atoms/SwitchLanguage/SwitchLanguage";
import './NavbarHome.css'
import { BorderStyle } from "@mui/icons-material";

const NavbarHome: React.FC = () => {
  return (
    <Box
      component="nav"
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: "var(--padding-big)",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "transparent",
        boxShadow: "none", 
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "var(--padding-big)" }}>
        <Box component="span" sx={{ display: "flex", width: "fit-content", alignItems: "center", gap:"5px"}}>
          <Image className="nav-logo" src="/icons/logoRiwi.svg" alt="Riwi" width={90} height={40} />
          <Typography
            variant="h1"
            sx={{ fontSize: "2rem", color: "var(--main-color)",textShadow:'-0.5px -0.5px 0 var(--white-color),0.5px -0.5px 0 var(--white-color),-0.5px  0.5px 0 var(--white-color),0.5px  0.5px 0 var(--white-color)', fontFamily: "var(--main-font)", fontWeight: 500 }}
          >
            LinkUp
          </Typography>
        </Box>
        <SelectLanguage />
      </Box>

      <Box component="span" sx={{ display: "flex", alignItems: "center", gap: "var(--padding-medium)" }}>
        <CustomLink
          text="About Us"
          href="https://riwi.io/empleadores/"
          target="_blank"
        ></CustomLink>
        <CustomLink
          text="Contact Us"
          href="https://riwi.io/empleadores/#Contacto"
          target="_blank"
        ></CustomLink>
        <SecondaryButton text="Sign Up" onClick={() => { }}></SecondaryButton>
        <MainButton text="Join Us" onClick={() => { }}></MainButton>
      </Box>
    </Box>
  );
};

export default NavbarHome;
