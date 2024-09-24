// Importing necessary components and hooks
import { Box, Typography } from "@mui/material";
import MobileToggle from "../../atoms/MobileToggle/MobileToggle";
import useNavigate from "@/utilities/NavigateTo";

// Defining the props interface for the MobileNavbar component
interface MobileNavbarProps {
    isDarkMode: boolean;
    language: boolean;
}

// Defining the MobileNavbar component
const MobileNavbar: React.FC<MobileNavbarProps> = ({ isDarkMode, language }) => {
    // Importing the navigate function from the useNavigate utility
    const navigate = useNavigate();

    // Rendering the mobile navbar
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
            {/* Rendering the Riwi LinkUp logo */}
            <Typography
                variant="h1"
                sx={{ 
                    fontSize: "1.5rem",
                    color: isDarkMode ? "var(--main-color)" : "var(--paragraph-color)",
                    fontFamily: "var(--main-font)",
                    fontWeight: 500,
                    cursor: 'pointer' // Adding a pointer cursor
                }}
                onClick={() => navigate('/')} // Handling the click event to navigate to the home page
            >
                Riwi LinkUp
            </Typography>
            {/* Rendering the mobile toggle component */}
            <MobileToggle language={language} />
        </Box>
    );
};

// Exporting the MobileNavbar component
export default MobileNavbar;