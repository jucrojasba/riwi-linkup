import "./filterStyles.css";
import { ReactNode, useEffect, useState } from "react";
import InputFilter from "../../atoms/InputFilter/InputFilter";
import MainButton from "../../atoms/MainButton/MainButton";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import SearchIcon from '@mui/icons-material/Search';
import { FilterState } from "@/UI/interfaces/Filter";
import { filterService } from "@/services/filterService";
import { useCodersFilter } from "@/global-states/coder";
import { getClansService, getLanguagesService, getSoftSkillsService, getTechnicalSkillsService } from "@/services";
import { getCodersService } from "@/services/coderService";
import { useTechSkill } from "@/global-states/techSkill";
import { useLanguage } from "@/global-states/language-mode";
import { useDataBackLoad } from "@/global-states/dataBack";
import { getGendersService } from "@/services/genderService";

interface IFilterProps {
  render?: boolean;
  setRender?: (value: boolean) => void;
}

export default function Filter({ setRender, render }: IFilterProps): ReactNode {
  const initialState: FilterState = {
    languages: [],
    techSkills: [],
    softSkills: [],
    clans: []
  };

  const [checkedStates, setCheckedStates] = useState<FilterState>(initialState);
  const { setCodersFilter } = useCodersFilter();
  const { setTechSkill } = useTechSkill();
  const language = useLanguage((state) => state.language);
  const { setDataBackLoad } = useDataBackLoad();

  useEffect(() => {
    const fetchFiltersData = async () => {
      try {
        const languages = await getLanguagesService();
        const techSkills = await getTechnicalSkillsService();
        const softSkills = await getSoftSkillsService();
        const clans = await getClansService();
        const genders = await getGendersService();
        if (languages && techSkills && softSkills && clans && genders) {
          setCheckedStates({
            languages,
            techSkills,
            softSkills,
            clans,
          });
          setDataBackLoad({ genders, languages, clans, softSkills, techSkills }); // Save data in global state of the coders
        }
      } catch (error) {
        console.error("Error loading filters", error);
      }
    };

    fetchFiltersData();
  }, [setCheckedStates, setDataBackLoad]);

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

  const handleClickButtonFilter = async () => {
    const data = await filterService(checkedStates);
    if (!data) {
      console.log({ message: "Error to filter" });
      return;
    }
    setCodersFilter(data);
    if (setRender) {
      setRender(true);
    }
  };

  const handleClickButtonClear = async () => {
    setCheckedStates((beforeState) => ({
      ...beforeState,
      languages: beforeState.languages.map((language) => ({
        ...language,
        checked: false,
      })),
      techSkills: beforeState.techSkills.map((techSkill) => ({
        ...techSkill,
        checked: false,
      })),
      softSkills: beforeState.softSkills.map((softSkill) => ({
        ...softSkill,
        checked: false,
      })),
      clans: beforeState.clans.map((clan) => ({
        ...clan,
        checked: false,
      })),
    }));
    const data = await getCodersService();
    if (!data) {
      console.log({ message: "Error to filter" });
      return;
    }
    setCodersFilter(data);
    if (setRender) {
      setRender(true);
    }
  };

  const conditiosClass = (label: string) => { // Function for change styles inputFilter
    switch (label) {
      case "java":
        return "java";
      case "c#":
        return "cSharp";
      case "nextJs":
        return "nextJs";
      case "nodeJs":
        return "nodeJs";
      default:
        return "";
    }
  };

  const changeLanguageText = (label: string): string | null => {
    const languageMap: Record<string, string> = {
      español: language ? "español" : "spanish",
      francés: language ? "francés" : "french",
      inglés: language ? "inglés" : "english",
      comunicación: language ? "comunicación" : "communication",
      "resolución de problemas": language ? "resolución de problemas" : "problem solving",
      liderazgo: language ? "liderazgo" : "leadership",
    };
    return languageMap[label] || null;
  };

  return (
    <div className="filter">
      <div className="filter-section-app">
      <div className="filter-languages">
        <h3 className="languages-title">{language ? 'Idiomas' : 'Languages'}</h3>
        <div className="languages-options">
          {checkedStates.languages.map((language) => (
            <InputFilter
              key={language.id}
              label={changeLanguageText(language.label)}
              name={language.name}
              className={""}
              onChange={handleChange}
              checked={language.checked}
            />
          ))}
        </div>
      </div>
      <div className="filter-teach">
        <h3 className="teach-title">{language ? 'Tecnologías' : 'Tech Skills'}</h3>
        <div className="teach-options">
          {checkedStates.techSkills.map((techSkill) => (
            <InputFilter
              key={techSkill.id}
              label={techSkill.label}
              name={techSkill.name}
              className={conditiosClass(techSkill.label)}
              onChange={(e) => {
                handleChange(e);
                setTechSkill(techSkill.label);
              }}
              checked={techSkill.checked}
            />
          ))}
        </div>
      </div>
      <div className="filter-skills">
        <h3 className="skills-title">{language ? 'Habilidades' : 'Soft Skills'}</h3>
        <div className="skills-options">
          {checkedStates.softSkills.map((softSkill) => (
            <InputFilter
              key={softSkill.id}
              label={changeLanguageText(softSkill.label)}
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
      </div>
      <div className="section-buttons-filters">
        <div className="button-search top">
          <MainButton
            icon={<FilterAltOffIcon />}
            text={"clear"}
            type="button"
            onClick={handleClickButtonClear}
          />
        </div>
        <div className="button-search">
          <MainButton
            icon={<SearchIcon />}
            text={"search"}
            type="button"
            onClick={handleClickButtonFilter}
          />
        </div>
      </div>
    </div>
  );
}
