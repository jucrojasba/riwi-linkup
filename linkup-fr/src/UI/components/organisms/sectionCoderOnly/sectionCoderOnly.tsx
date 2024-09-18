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
import { CircularLoader } from "../../atoms";
import { capitalizeFirstLetter } from "@/utilities/CapitalizeFirstLetter";
export default function SectionCoderOnly(): React.ReactElement {
  const initialCoder:ICoderBack = {
    idCoder: 0,
    name: "",
    birthday: "",
    description: "",
    urlImage: "",
    clanId: 0,
    genderName: "",
    softSkills: [],
    languageLevels: [],
    technicalSkillLevels: [],
  }
  const [coder,setCoder] = useState<ICoderBack>(initialCoder);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true); // Set initial state to true

  useEffect(()=>{
    const getCoderById = async ()=>{
      const coder = searchParams.get("coder");
      const data = await getCoderByIdService(parseInt(coder!));
      if(data && "message" in data) return;
      setCoder(data);
    };
    getCoderById();
    setLoading(false);
  }, [searchParams]);
  return(
    <>
    {loading ? <CircularLoader flag={true} /> : null}
    <div className="content-coder">
        <div className="coder">
          <div className="coder-image">
              <img src={coder.urlImage} alt="womanImage" />
          </div>
          <div className="content-information">
              <div className="information-header">
                <UserText
                title="Name"
                paragraph={coder.name ? capitalizeSentece(coder.name) : "There is no name"}
                className="user-name"
                />
                <UserText
                title="Years"
                paragraph={coder.birthday ? `${calculateAge(coder.birthday)} years` : "There is no birthday"}
                className="user-age"
                />
                <UserText
                title="Gender"
                paragraph={coder.genderName ? capitalizeSentece(coder.genderName) : "There is no gender"}
                className="user-gender"
                />
              </div>
              <div className="information-body">
                <h4>Description</h4>
                <p>{coder.description ? capitalizeFirstLetter(coder.description) : "There is no description"}</p>
              </div>
              <div className="information-footer">
                <ButtonCoder 
                content="CV"
                onClick={() => console.log("click")}
                />
                <ButtonCoder 
                content={<PlayArrowIcon />}
                className="play-button"
                onClick={() => console.log("click")}
                />
                <ButtonCoder 
                content="Portfolio"
                onClick={() => console.log("click")}
                />
                <ButtonCoder 
                content="Repository"
                onClick={() => console.log("click")}
                /> 
              </div>
          </div>
        </div>
        <div className="backCoder">
          <button>Back</button>
        </div>
    </div>
    </>
  )
}
