import "./filterStyles.css";
import { ReactNode, useState } from "react";
import InputFilter from "../../atoms/InputFilter/InputFilter";
import MainButton from "../../atoms/MainButton/MainButton";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import SearchIcon from '@mui/icons-material/Search';
import { FilterState } from "@/UI/interfaces/Filter";
import { filterService } from "@/services/filterService";
import { useCodersFilter } from "@/global-states/coder";
import { ICoder } from "@/UI/interfaces/ICoderInterface";
import { getCodersService } from "@/services/coderService";

interface IFilterProps{
  render?: boolean;
  setRender?: (value:boolean) => void
}
export default function Filter({setRender, render}:IFilterProps): ReactNode {
  const initialState: FilterState = {
    languages: [
      { checked: false, name: "ingles", label: "English", id: 1 },
      { checked: false, name: "portugues", label: "Portuguese", id: 2 },
      { checked: false, name: "frances", label: "French", id: 3 },
    ],
    techSkills: [
      { checked: false, name: "javascript", label: "Javascript", id: 1 },
      { checked: false, name: "python", label: "Python", id: 2 },
      { checked: false, name: "java", label: "Java", id: 3},
    ],
    softSkills: [
      { checked: false, name: "communication", label: "Communication", id: 1 },
      { checked: false, name: "teamwork", label: "Teamwork", id: 2 },
    ],
    clans: [
      { checked: false, name: "bernesLee", label: "Bernes Lee", id: 1},
      { checked: false, name: "ritchie", label: "Ritchie", id: 2 },
      { checked: false, name: "gates", label: "Gates", id:  3},
    ],
  };
  const [checkedStates, setCheckedStates] = useState<FilterState>(initialState);
  const {setCodersFilter} = useCodersFilter();

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

  const handleClickButtonFilter = async() => {
    const data = await filterService(checkedStates);
    if(!data){
      console.log({message: "Error to filter"})
      return;
    }
    setCodersFilter(data);
    if(setRender){
      setRender(true);
    }
  };

  const handleCLickButtonClear = async() =>{
    setCheckedStates(initialState);
    const data = await getCodersService();
    if(!data){
      console.log({message: "Error to filter"})
      return;
    }
    setCodersFilter(data);
    if(setRender){
      setRender(true);
    }
  }

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
          {checkedStates.techSkills.map((techSkill) => (
            <InputFilter
              key={techSkill.name}
              label={techSkill.label}
              name={techSkill.name}
              onChange={handleChange}
              checked={techSkill.checked}
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
        <MainButton
          icon={<FilterAltOffIcon />}
          text={""}
          type="button"
          onClick={handleCLickButtonClear}
        />
      </div>
      <div className="button-search">
        <MainButton
          icon={<SearchIcon />}
          text={""}
          type="button"
          onClick={handleClickButtonFilter}
        />
      </div>
    </div>
  );
}

