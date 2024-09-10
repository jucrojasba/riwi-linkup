"use client";
import "./pageStyles.css";
import TitleHome from "@/UI/components/atoms/TitleHome/TitleHome";
import RoundedButton from "@/UI/components/atoms/ButtonRounded/ButtonRounded";
import EastIcon from "@mui/icons-material/East";
import useNavigate from "@/utilities/NavigateTo";
import Image from "next/image";
import IconWithHover from "@/UI/components/atoms/IconHover/IconHover";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SwitchMode from "@/UI/components/atoms/SwitchDarkMode/SwitchDarkMode";
import { useDarkMode } from "@/global-states/dark-mode";

export default function HomeView() {
  //Logic
  const navigate = useNavigate();
  const DarkMode = useDarkMode((state)=>state.DarkMode);
  console.log("Dark Mode", DarkMode);

  return (
    <main>
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
              navigate("/register");
            }}
          ></RoundedButton>
        </div>
        <div className="gretting-image">
          <Image
            src="/icons/arrowPurple.png"
            alt="Coder Gretting"
            width={120}
            height={120}
          />
          <div className="coder-gretting-container">
            <Image
              src="/images/coderGretting.png"
              alt="Coder Gretting"
              width={500}
              height={500}
            />
          </div>
        </div>
        <div className="media-icons">
          <IconWithHover
            icon={<InstagramIcon fontSize="inherit" />}
            color="var(--paragraph-color)"
            hoverColor="#FF00FF"
            onClick={() => {}}
          />
          <IconWithHover
            icon={<WhatsAppIcon fontSize="inherit" />}
            color="var(--paragraph-color)"
            hoverColor="#25D366"
            onClick={() => {}}
          />
        </div>
        <div className="switch-mode-home">
          <SwitchMode onClick={() => {}}></SwitchMode>
        </div>
      </div>
    </main>
  );
}
