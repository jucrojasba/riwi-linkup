import "./sectionCoderOnly.css";
import UserText from "../../atoms/UserText/UserText";
import { ButtonCoder } from "../../atoms";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useEffect, useState } from "react";
import { ICoderBack } from "@/UI/interfaces/ICoderInterface";
import { getCoderByIdService } from "@/services/coderService";
import { useSearchParams } from "next/navigation";
export default function SectionCoderOnly(): React.ReactElement {
  const initialCoder:ICoderBack = {
    idCoder: 0,
    name: "",
    birthday: "",
    description: "",
    urlImage: "",
    clanId: 0,
    softSkills: [],
    languageLevels: [],
    technicalSkillLevels: [],
  }
  const [coder,setCoder] = useState<ICoderBack>(initialCoder);
  const searchParams = useSearchParams();

  useEffect(()=>{
    const getCoderById = async ()=>{
      const coder = searchParams.get("coder");
      const data = await getCoderByIdService(parseInt(coder!));
      if(data && "message" in data) return;
      setCoder(data);
    };
    getCoderById();
  }, [searchParams]);
  console.log(coder);
  return(
    <div className="content-coder">
        <div className="coder">
          <div className="coder-image">
              <img src="/images/womanImage.png" alt="womanImage" />
          </div>
          <div className="content-information">
              <div className="information-header">
                <UserText
                title="Name"
                paragraph="John Doe"
                className="user-name"
                />
                <UserText
                title="Years"
                paragraph="24 años"
                className="user-age"
                />
                <UserText
                title="Gender"
                paragraph="Male"
                className="user-gender"
                />
              </div>
              <div className="information-body">
                <h4>Description</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
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
    </div>
  )
}
