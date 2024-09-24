import "./filterStyles.css"; // Import CSS for styling the filter component
import { ReactNode, useEffect, useState } from "react"; // Import necessary hooks and types from React
import InputFilter from "../../atoms/InputFilter/InputFilter"; // Import the InputFilter component for checkbox inputs
import MainButton from "../../atoms/MainButton/MainButton"; // Import the MainButton component for buttons
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff"; // Import an icon for the clear button
import SearchIcon from '@mui/icons-material/Search'; // Import an icon for the search button
import { FilterState } from "@/UI/interfaces/Filter"; // Import FilterState type from interfaces
import { filterService } from "@/services/filterService"; // Import the filter service for fetching filtered data
import { useCodersFilter } from "@/global-states/coder"; // Import global state for coders filter
import { getClansService, getCodersService, getLanguagesService, getSoftSkillsService, getTechnicalSkillsService } from "@/services"; // Import various service functions for fetching data
import { useTechSkill } from "@/global-states/techSkill"; // Import global state for tech skills
import { useLanguage } from "@/global-states/language-mode"; // Import global state for language selection
import { useDataBackLoad } from "@/global-states/dataBack"; // Import global state for back-loading data
import { getGendersService } from "@/services/genderService"; // Import the gender service for fetching gender data

// Define props for the Filter component
interface IFilterProps {
  render?: boolean; // Optional prop to determine if the component should render
  setRender?: (value: boolean) => void; // Optional function to set the render state
}

export default function Filter({ setRender, render }: IFilterProps): ReactNode {
  // Initialize the state for filters
  const initialState: FilterState = {
    languages: [],
    techSkills: [],
    softSkills: [],
    clans: []
  };

  // Define state for checked filters
  const [checkedStates, setCheckedStates] = useState<FilterState>(initialState);
  const { setCodersFilter } = useCodersFilter(); // Get function to set coders filter from global state
  const { setTechSkill } = useTechSkill(); // Get function to set tech skill from global state
  const language = useLanguage((state) => state.language); // Get the current language from global state
  const { setDataBackLoad } = useDataBackLoad(); // Get function to set back-load data from global state

  // Fetch filters data when the component mounts
  useEffect(() => {
    const fetchFiltersData = async () => {
      try {
        // Fetch data for languages, technical skills, soft skills, clans, and genders
        const languages = await getLanguagesService();
        const techSkills = await getTechnicalSkillsService();
        const softSkills = await getSoftSkillsService();
        const clans = await getClansService();
        const genders = await getGendersService();
        if (languages && techSkills && softSkills && clans && genders) {
          // Update checkedStates with fetched data
          setCheckedStates({
            languages,
            techSkills,
            softSkills,
            clans,
          });
          // Set back-load data
          setDataBackLoad({ genders, languages, clans, softSkills, techSkills });
        }
      } catch (error) {
        console.error("Error loading filters", error); // Log any errors that occur during fetching
      }
    };

    fetchFiltersData(); // Call the function to fetch data
  }, [setDataBackLoad]); // Run the effect only once on mount

  // Handle change in filter options (checkboxes)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target; // Get name and checked status of the input
    const updatedState = { ...checkedStates }; // Copy the current checked states
    (Object.keys(updatedState) as Array<keyof FilterState>).forEach((key) => {
      // Update the checked status of the appropriate filter
      updatedState[key] = updatedState[key].map((item) =>
        item.name === name ? { ...item, checked } : item
      );
    });
    setCheckedStates(updatedState); // Update the state with new checked values
  };

  // Handle search button click
  const handleClickButtonFilter = async () => {
    const data = await filterService(checkedStates); // Fetch filtered data using the filter service
    console.log("data filter", data); // Log the filtered data
    if (!data) {
      console.log({ message: "Error to filter" }); // Log error if no data is returned
      return;
    }
    setCodersFilter(data); // Set the coders filter with the fetched data
    if (setRender) {
      setRender(true); // Trigger render update if setRender is provided
    }
  };

  // Handle clear button click
  const handleClickButtonClear = async () => {
    // Reset checked states for all filters to false
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

    const data = await getCodersService(); // Fetch all coders data
    if (!data) {
      console.log({ message: "Error to filter" }); // Log error if no data is returned
      return;
    }
    setCodersFilter(data); // Set coders filter with all data
    if (setRender) {
      setRender(true); // Trigger render update if setRender is provided
    }
  };

  // Define a function to return class names based on technology label
  const conditiosClass = (label: string) => {
    switch (label) {
      case "java":
        return "java"; // Return Java class
      case "c#":
        return "cSharp"; // Return C# class
      case "nextJs":
        return "nextJs"; // Return Next.js class
      case "nodeJs":
        return "nodeJs"; // Return Node.js class
      default:
        return ""; // Return empty string for unrecognized labels
    }
  };

  // Change language text based on the current language selected
  const changeLanguageText = (label: string): string | null => {
    const languageMap: Record<string, string> = {
      español: language ? "español" : "spanish", // Spanish translation
      francés: language ? "francés" : "french", // French translation
      inglés: language ? "inglés" : "english", // English translation
      comunicación: language ? "comunicación" : "communication", // Communication translation
      "resolución de problemas": language ? "resolución de problemas" : "problem solving", // Problem-solving translation
      liderazgo: language ? "liderazgo" : "leadership", // Leadership translation
    };
    return languageMap[label] || null; // Return translated text or null if not found
  };

  return (
    <div className="filter"> {/* Main filter container */}
      <div className="filter-section-app"> {/* Container for filter sections */}
        <div className="filter-languages"> {/* Languages filter section */}
          <h3 className="languages-title">{language ? 'Idiomas' : 'Languages'}</h3> {/* Title for languages */}
          <div className="languages-options"> {/* Container for language options */}
            {checkedStates.languages.map((language) => (
              <InputFilter
                key={language.id} // Unique key for each language option
                label={changeLanguageText(language.label)} // Display label based on language
                name={language.name} // Name for the input
                onChange={handleChange} // Event handler for changes
                checked={language.checked} // Checked state
              />
            ))}
          </div>
        </div>
        <div className="filter-teach"> {/* Tech skills filter section */}
          <h3 className="teach-title">{language ? 'Tecnologías' : 'Tech Skills'}</h3> {/* Title for tech skills */}
          <div className="teach-options"> {/* Container for tech skills options */}
            {checkedStates.techSkills.map((techSkill) => (
              <InputFilter
                key={techSkill.id} // Unique key for each tech skill option
                label={techSkill.label} // Display label for tech skill
                name={techSkill.name} // Name for the input
                className={conditiosClass(techSkill.label)} // Class based on tech skill label
                onChange={(e) => {
                  handleChange(e); // Handle changes
                  setTechSkill(techSkill.label); // Set the selected tech skill in global state
                }}
                checked={techSkill.checked} // Checked state
              />
            ))}
          </div>
        </div>
        <div className="filter-skills"> {/* Soft skills filter section */}
          <h3 className="skills-title">{language ? 'Habilidades' : 'Soft Skills'}</h3> {/* Title for soft skills */}
          <div className="skills-options"> {/* Container for soft skills options */}
            {checkedStates.softSkills.map((softSkill) => (
              <InputFilter
                key={softSkill.id} // Unique key for each soft skill option
                label={changeLanguageText(softSkill.label)} // Display label based on language
                name={softSkill.name} // Name for the input
                onChange={handleChange} // Event handler for changes
                checked={softSkill.checked} // Checked state
              />
            ))}
          </div>
        </div>
        <div className="filter-clans"> {/* Clans filter section */}
          <h3 className="clans-title">{language ? 'Clanes' : 'Clans'}</h3> {/* Title for clans */}
          <div className="clans-options"> {/* Container for clans options */}
            {checkedStates.clans.map((clan) => (
              <InputFilter
                key={clan.id} // Unique key for each clan option
                label={clan.label} // Display label for clan
                name={clan.name} // Name for the input
                onChange={handleChange} // Event handler for changes
                checked={clan.checked} // Checked state
              />
            ))}
          </div>
        </div>
      </div>
      <div className="section-buttons-filters">
        <div className="button-search top">
          <MainButton
            icon={<FilterAltOffIcon />}
            text={language ? "Limpiar" : "Clear"}
            type="button"
            onClick={handleClickButtonClear}
          />
        </div>
        <div className="button-search">
          <MainButton
            icon={<SearchIcon />}
            text={language ? "Buscar" : "Search"}
            type="button"
            onClick={handleClickButtonFilter}
          />
        </div>
      </div>
    </div>
  );
}
