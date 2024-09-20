import { Box, Typography } from "@mui/material";
import MobileToggle from "../../atoms/MobileToggle/MobileToggle";
import useNavigate from "@/utilities/NavigateTo";


interface MobileNavbarProps {
    isDarkMode: boolean;
    language: boolean;
}
  
const MobileNavbar: React.FC<MobileNavbarProps> = ({ isDarkMode, language }) => {
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
            <Typography
                variant="h1"
                sx={{ fontSize: "1.5rem", color: isDarkMode ? "var(--main-color)" : "var(--paragraph-color)", fontFamily: "var(--main-font)", fontWeight: 500, cursor: 'pointer' }} // Añade cursor pointer
                onClick={() => navigate('/')} // Maneja el clic
            >
                Riwi LinkUp
            </Typography>
            <MobileToggle language={language} />
        </Box>
    );
};

export default MobileNavbar;
