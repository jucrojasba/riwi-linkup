"use client"; // Indicates this component is a client component in Next.js
import "./pageStyles.css"; // Importing CSS for styling the component
import TitleHome from "@/UI/components/atoms/TitleHome/TitleHome"; // Importing a title component
import RoundedButton from "@/UI/components/atoms/ButtonRounded/ButtonRounded"; // Importing a rounded button component
import EastIcon from "@mui/icons-material/East"; // Importing an icon from Material UI
import useNavigate from "@/utilities/NavigateTo"; // Importing a custom navigation utility
import Image from "next/image"; // Importing Image component from Next.js
import { useDarkMode } from "@/global-states/dark-mode"; // Importing the dark mode state
import NavbarHome from "@/UI/components/molecules/NavbarHome/NavbarHome"; // Importing the navbar component
import RiwiLogo from "@/UI/components/atoms/RiwiLogo/RiwiLogo"; // Importing a logo component
import UtilityRightButtons from "@/UI/components/molecules/UtilityRightButtons/UtilityRightButtons"; // Importing utility buttons
import AuthLayout from "@/UI/components/organisms/AuthLayout/AuthLayout"; // Importing the authentication layout
import { useLanguage } from "@/global-states/language-mode"; // Importing the language state
import Route from "@/routes/route"; // Importing the Route component for routing

export default function HomeView() {
  // Logic
  const navigate = useNavigate(); // Using the custom navigation hook
  const DarkMode = useDarkMode((state) => state.DarkMode); // Getting the dark mode state
  const language = useLanguage((state) => state.language); // Getting the current language state

  return (
    <Route>
      <main>
        <AuthLayout isDarkMode={DarkMode} language={language} /> {/* Auth layout */}
        <UtilityRightButtons isDarkMode={DarkMode} responsive={true} /> {/* Utility buttons for right side */}
        <div className={`${DarkMode ? "home-no-auth-wrapper-dark-mode" : "home-no-auth-wrapper"}`}>
          <div className="home-info">
            <TitleHome
              title={language ? "Gestión y reclutamiento ágil de talento tecnológico" : "Agile management and recruitment of tech talent"}
              subtitle={language ? "Encuentra talento tecnológico con conocimientos competitivos" : "Find tech talent with competitive knowledge"}
              isDarkMode={DarkMode} // Passing dark mode state to title component
            />
            <RoundedButton
              text={language ? 'Empecemos' : "Get Started"}
              expandMessage={
                language ? (
                  <>
                    Empecemos <EastIcon sx={{ fontSize: "2rem" }} />
                  </>
                ) : (
                  <>
                    Get Started <EastIcon sx={{ fontSize: "2rem" }} />
                  </>
                )
              }
              onClick={() => {
                navigate("/login"); // Navigating to the login page on button click
              }}
            />
          </div>
          <div className="coder-gretting-wrapper">
            <div className="gretting-image" onClick={() => navigate('/login')}>
              <Image
                src="/icons/arrowPurple.png"
                alt="Coder Greeting"
                width={120}
                height={120}
              />
            </div>
            <div className="coder-gretting-container">
              <Image
                src="/images/coderGretting.png"
                alt="Coder Greeting"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </main>
    </Route>
  );
}
