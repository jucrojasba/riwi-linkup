import { ReactNode, useState } from "react";
import InputFilter from "../../atoms/InputFilter/InputFilter";
import "./filterStyles.css";

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
  const initialState:FilterState = {
    languages: [
      { checked: false, name: "cSharp", label: "C#-ASP.NET" },
      { checked: false, name: "java", label: "Java" },
      { checked: false, name: "nextjs", label: "Next.js" },
    ],
    teachSkills: [
      { checked: false, name: "cSharp", label: "C#-ASP.NET" },
      { checked: false, name: "java", label: "Java" },
      { checked: false, name: "nextjs", label: "Next.js" },
    ],
    softSkills: [
      { checked: false, name: "cSharp", label: "C#-ASP.NET" },
      { checked: false, name: "java", label: "Java" },
      { checked: false, name: "nextjs", label: "Next.js" },
    ],
    clans: [
      { checked: false, name: "cSharp", label: "C#-ASP.NET" },
      { checked: false, name: "java", label: "Java" },
      { checked: false, name: "nextjs", label: "Next.js" },
    ],
  };
  const [checkedStates, setCheckedStates] = useState<FilterState>(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const updatedState = {...checkedStates};
    (Object.keys(updatedState) as Array<keyof FilterState>).forEach((key) => {
      updatedState[key] = updatedState[key].map((item) =>
        item.name === name ? { ...item, checked } : item
      );
    });

    setCheckedStates(updatedState);
  };
  console.log(checkedStates);
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
    </div>
  );
}
