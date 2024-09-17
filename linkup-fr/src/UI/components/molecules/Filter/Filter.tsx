import "./filterStyles.css";
import { ReactNode, useEffect, useState } from "react";
import InputFilter from "../../atoms/InputFilter/InputFilter";
import MainButton from "../../atoms/MainButton/MainButton";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import SearchIcon from '@mui/icons-material/Search';
import { FilterState } from "@/UI/interfaces/Filter";
import { filterService } from "@/services/filterService";
import { useCodersFilter } from "@/global-states/coder";
import { ICoder } from "@/UI/interfaces/ICoderInterface";
import { getClansService, getLanguagesService, getSoftSkillsService, getTechnicalSkillsService } from "@/services";
import { getCodersService } from "@/services/coderService";
import { ILanguage } from "@/UI/interfaces/languageInterface";

interface IFilterProps{
  render?: boolean;
  setRender?: (value:boolean) => void
}
export default function Filter({setRender, render}:IFilterProps): ReactNode {
  const [languages, setLanguage] = useState<ILanguage[]>([]);
  const initialState: FilterState = {
    languages: [],
    techSkills: [],
    softSkills: [],
    clans: []
  };
  const [checkedStates, setCheckedStates] = useState<FilterState>(initialState);
  const {setCodersFilter} = useCodersFilter();

  useEffect(() => {
    const fetchFiltersData = async () => {
      try {
        const languages = await getLanguagesService();
        const techSkills = await getTechnicalSkillsService();
        const softSkills = await getSoftSkillsService();
        const clans = await getClansService();
        if (languages && techSkills && softSkills && clans) {
          setCheckedStates({
            languages,
            techSkills,
            softSkills,
            clans,
          });
        }
      } catch (error) {
        console.error("Error loading filters", error);
      }
    };

    fetchFiltersData();
  }, []);

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
              key={language.id}
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
              key={techSkill.id}
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
              key={softSkill.id}
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
              key={clan.id}
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

