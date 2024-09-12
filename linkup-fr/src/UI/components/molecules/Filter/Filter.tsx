import { ReactNode, useState } from "react";
import InputFilter from "../../atoms/InputFilter/InputFilter";
import "./filterStyles.css";

export default function Filter(): ReactNode {
  const initialState = {
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
  const [checkedStates, setCheckedStates] = useState(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    console.log(checked,name);
  };
  console.log(checkedStates);
  return (
    <div className="filter">
      <div className="filter-languages">
        <h3 className="languages-title">Languages</h3>
        <div className="languages-options">
          {initialState.languages.map((languages) => (
            <InputFilter
              label={languages.label}
              name={languages.name}
              onChange={handleChange}
              checked={languages.checked}
            />
          ))}
        </div>
      </div>
      <div className="filter-teach">
        <h3 className="teach-title">Teach Skills</h3>
        <div className="teach-options">
          {initialState.teachSkills.map((teachSkills) => (
            <InputFilter
              label={teachSkills.label}
              name={teachSkills.name}
              onChange={handleChange}
              checked={teachSkills.checked}
            />
          ))}
        </div>
      </div>
      <div className="filter-skills">
        <h3 className="skills-title">Soft Skills</h3>
        <div className="skills-options">
          {initialState.softSkills.map((softSkills) => (
            <InputFilter
              label={softSkills.label}
              name={softSkills.name}
              onChange={handleChange}
              checked={softSkills.checked}
            />
          ))}
        </div>
      </div>
      <div className="filter-clan">
        <h3 className="clan-title">Clan</h3>
        <div className="clan-options">
          {initialState.clans.map((clans) => (
            <InputFilter
              label={clans.label}
              name={clans.name}
              onChange={handleChange}
              checked={clans.checked}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
