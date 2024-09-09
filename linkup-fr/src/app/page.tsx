"use client";
import "./pageStyles.css";
import TitleHome from "@/UI/components/atoms/TitleHome/TitleHome";
import RoundedButton from "@/UI/components/atoms/ButtonRounded/ButtonRounded";
import EastIcon from "@mui/icons-material/East";
import useNavigate from "@/utilities/NavigateTo";

export default function HomeView() {
  //Logic
  const navigate = useNavigate();

  return (
    <main>
      <div className="home-no-auth-wrapper">
        <div className="home-info">
          <TitleHome
            title="easy management and acquisition of tech talent"
            subtitle="find tech talent with competitive knowledge"
          ></TitleHome>
          <RoundedButton
            text="Get Started"
            expandMessage={
              <>
                Get Started <EastIcon />
              </>
            }
            onClick={() => {
              navigate("/register");
            }}
          ></RoundedButton>
        </div>
      </div>
    </main>
  );
}
