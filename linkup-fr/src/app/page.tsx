"use client";
import "./pageStyles.css";
import TitleHome from "@/UI/components/atoms/TitleHome/TitleHome";
import RoundedButton from "@/UI/components/atoms/ButtonRounded/ButtonRounded";
import EastIcon from "@mui/icons-material/East";
import useNavigate from "@/utilities/NavigateTo";
import Image from "next/image";
import { useDarkMode } from "@/global-states/dark-mode";
import NavbarHome from "@/UI/components/molecules/NavbarHome/NavbarHome";
import RiwiLogo from "@/UI/components/atoms/RiwiLogo/RiwiLogo";
import UtilityRightButtons from "@/UI/components/molecules/UtilityRightButtons/UtilityRightButtons";
import AuthLayout from "@/UI/components/organisms/AuthLayout/AuthLayout";
import { useLanguage } from "@/global-states/language-mode";
import Route from "@/routes/route";

export default function HomeView() {
  //Logic
  const navigate = useNavigate();
  const DarkMode = useDarkMode((state) => state.DarkMode);
  const language =useLanguage((state)=>state.language);

  return (
    <Route>
        <main>
        <AuthLayout isDarkMode={DarkMode} />
        <div className={`home-no-auth-wrapper ${DarkMode ? "dark-mode" : ""}`}>
          <div className="home-info">
            <TitleHome
              title={language? "Gestión y reclutamiento ágil de talento tecnológico":"Agile management and recruitment of tech talent"}
              subtitle={language? "Encuentra talento tecnológico con conocimientos competitivos":"Find tech talent with competitive knowledge"}
              isDarkMode={DarkMode}
            ></TitleHome>
            <RoundedButton
              text={language? 'Empecemos':"Get Started"}
              expandMessage={language?
                <>
                  Empecemos <EastIcon sx={{ fontSize: "2rem" }} />
                </> :
                <>
                  Get Started <EastIcon sx={{ fontSize: "2rem" }} />
                </>
              }
              onClick={() => {
                navigate("/login");
              }}
            ></RoundedButton>
          </div>
          <div className="coder-gretting-wrapper">
            <div className="gretting-image" onClick={()=>navigate('/login')}>
              <Image
                src="/icons/arrowPurple.png"
                alt="Coder Gretting"
                width={120}
                height={120}
              />
            </div>
            <div className="coder-gretting-container">
              <Image
                src="/images/coderGretting.png"
                alt="Coder Gretting"
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
