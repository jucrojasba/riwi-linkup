import "./sectionCoderOnly.css";
import UserText from "../../atoms/UserText/UserText";
import { ButtonCoder } from "../../atoms";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useEffect, useState } from "react";
import { ICoderBack } from "@/UI/interfaces/ICoderInterface";
import { getCoderByIdService } from "@/services/coderService";
import { useSearchParams } from "next/navigation";
import calculateAge from "@/utilities/calculateAge";
import { capitalizeSentece } from "@/utilities/CapitalizeSentence";
import { LinearLoader } from "../../atoms";
import { capitalizeFirstLetter } from "@/utilities/CapitalizeFirstLetter";
import MainButton from "../OrganismTest";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useRouter } from "next/navigation";

export default function SectionCoderOnly(): React.ReactElement {
  const initialCoder: ICoderBack = {
    id: 0,
    name: "",
    birthday: "",
    description: "",
    urlImage: "",
    clanId: 0,
    genderName: "",
    genderId: 0,
    softSkills: [],
    languageLevels: [],
    technicalSkillLevels: [],
  };

  const [coder, setCoder] = useState<ICoderBack>(initialCoder);
  const [loading, setLoading] = useState<boolean>(true);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const getCoderById = async () => {
      const coderId = searchParams.get("coder");
      if (!coderId) return;

      const data = await getCoderByIdService(parseInt(coderId));
      if (data && "message" in data) return;

      setCoder(data);
      setLoading(false);
    };

    getCoderById();
  }, [searchParams]);

  const handleBack = () =>{
    setLoading(true);
    router.push("/admin");
  }

  if(!loading){
    return (
      <>
        {loading ? <LinearLoader flag={true} /> : null}
        <div className="content-coder">
          <div className="coder">
            <div className="coder-image">
              <img 
                src={coder.urlImage} 
                alt={`image ${coder.name}`} 
                onLoad={() => setImageLoaded(true)} 
                style={{ display: imageLoaded ? 'block' : 'none' }} 
              />
               <MainButton
                type="button"
                text={<KeyboardBackspaceIcon />}
                onClick={handleBack}
                />
            </div>
            <div className="content-information">
              <div className="information-header">
                <UserText
                  title="Name"
                  paragraph={coder.name ? capitalizeSentece(coder.name) : "Loading name..."}
                  className="user-name"
                />
                <UserText
                  title="Years"
                  paragraph={coder.birthday ? `${calculateAge(coder.birthday)} years` : "Loading birthday..."}
                  className="user-age"
                />
                <UserText
                  title="Gender"
                  paragraph={coder.genderName ? capitalizeSentece(coder.genderName) : "Loading gender..."}
                  className="user-gender"
                />
              </div>
              <div className="information-body">
                <h4>Description</h4>
                <p>{coder.description ? capitalizeFirstLetter(coder.description) : "Loading description..."}</p>
              </div>
              <div className="information-footer">
                <ButtonCoder 
                  content="CV"
                  onClick={() =>  coder.name === "jose barreto" ?  window.open("https://drive.google.com/file/d/1dSj9QbaCDSnMa4W8KPTzDh6Y_qlaX9L6/view?usp=sharing", "_blank"): null}
                />
                <ButtonCoder 
                  content={<PlayArrowIcon />}
                  className="play-button"
                  onClick={() =>  coder.name === "jose barreto" ?  window.open("https://www.youtube.com/watch?v=ot0-BgWcDuQ", "_blank"): null}
                />
                <ButtonCoder 
                  content="Portfolio"
                  onClick={() =>  coder.name === "jose barreto" ?  window.open("https://www.behance.net/gallery/207372215/PORTAFOLIO", "_blank"): null}
                />
                <ButtonCoder 
                  content="Repository"
                  onClick={() => coder.name === "jose barreto" ?  window.open("https://github.com/joseCardona12", "_blank"): null}
                /> 
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }else{
    return(
      <LinearLoader flag={true} />
    )
  }

  
}
