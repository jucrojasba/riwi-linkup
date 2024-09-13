import "./filterStyles.css";
import { ReactNode, useState } from "react";
import InputFilter from "../../atoms/InputFilter/InputFilter";
import MainButton from "../../atoms/MainButton/MainButton";
import SearchIcon from "@mui/icons-material/Search";

interface FilterOption {
  checked: boolean;
  name: string;
  label: string;
}

interface FilterState {
  languages: FilterOption[];
  teachSkills: FilterOption[];
  softSkills: FilterOption[];
  clans: FilterOption[];
}

export default function Filter(): ReactNode {
  const initialState: FilterState = {
    languages: [
      { checked: false, name: "cSharp", label: "C#-ASP.NET" },
      { checked: false, name: "java", label: "Java" },
      { checked: false, name: "nextjs", label: "Next.js" },
    ],
    teachSkills: [
      { checked: false, name: "ingles", label: "Ingles" },
      { checked: false, name: "espanol", label: "Español" },
      { checked: false, name: "portugues", label: "Portugues" },
    ],
    softSkills: [
      { checked: false, name: "teamwork", label: "Teamwork" },
      { checked: false, name: "communication", label: "Communication" },
      { checked: false, name: "leaderShip", label: "LeaderShip" },
    ],
    clans: [
      { checked: false, name: "bernesLee", label: "Bernes Lee" },
      { checked: false, name: "gates", label: "Gates" },
      { checked: false, name: "jeffBezzos", label: "Jeff bezzos" },
    ],
  };
  const [checkedStates, setCheckedStates] = useState<FilterState>(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const updatedState = { ...checkedStates };
    (Object.keys(updatedState) as Array<keyof FilterState>).forEach((key) => {
      updatedState[key] = updatedState[key].map((item) =>
        item.name === name ? { ...item, checked } : item
      );
    });

    setCheckedStates(updatedState);
  };

  const handleClickButton = () => {
    console.log(checkedStates);
  };

  return (
    <div className="filter">
      <div className="filter-languages">
        <h3 className="languages-title">Languages</h3>
        <div className="languages-options">
          {checkedStates.languages.map((language) => (
            <InputFilter
              key={language.name}
              label={language.label}
              name={language.name}
              onChange={handleChange}
              checked={language.checked}
            />
          ))}
        </div>
      </div>
      <div className="filter-teach">
        <h3 className="teach-title">Teach Skills</h3>
        <div className="teach-options">
          {checkedStates.teachSkills.map((teachSkill) => (
            <InputFilter
              key={teachSkill.name}
              label={teachSkill.label}
              name={teachSkill.name}
              onChange={handleChange}
              checked={teachSkill.checked}
            />
          ))}
        </div>
      </div>
      <div className="filter-skills">
        <h3 className="skills-title">Soft Skills</h3>
        <div className="skills-options">
          {checkedStates.softSkills.map((softSkill) => (
            <InputFilter
              key={softSkill.name}
              label={softSkill.label}
              name={softSkill.name}
              onChange={handleChange}
              checked={softSkill.checked}
            />
          ))}
        </div>
      </div>
      <div className="filter-clan">
        <h3 className="clan-title">Clan</h3>
        <div className="clan-options">
          {checkedStates.clans.map((clan) => (
            <InputFilter
              key={clan.name}
              label={clan.label}
              name={clan.name}
              onChange={handleChange}
              checked={clan.checked}
            />
          ))}
        </div>
      </div>
      <div className="button-search">
        <MainButton text={<SearchIcon />} type="button" onClick={handleClickButton} />
      </div>
    </div>
  );
}
