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

export default function HomeView() {
  //Logic
  const navigate = useNavigate();
  const DarkMode = useDarkMode((state) => state.DarkMode);

  return (
    <main>
      <NavbarHome isDarkMode={DarkMode}></NavbarHome>
      <div className={`home-no-auth-wrapper ${DarkMode ? "dark-mode" : ""}`}>
        <div className="home-info">
          <TitleHome
            title="Easy management and acquisition of tech talent"
            subtitle="find tech talent with competitive knowledge"
            isDarkMode={DarkMode}
          ></TitleHome>
          <RoundedButton
            text="Get Started"
            expandMessage={
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
        <UtilityRightButtons isDarkMode={DarkMode}></UtilityRightButtons>
        <RiwiLogo isDarkMode={DarkMode}></RiwiLogo>
      </div>
    </main>
  );
}
