// Interface representing the full details of a coder
export interface ICoder {
    idCoder: number; // Unique identifier for the coder
    name: string; // Coder's name
    birthday: string; // Coder's date of birth
    description: string; // Description or bio of the coder
    urlImage: string; // URL for the coder's profile image
    clanId: number; // ID of the coder's clan/group
    genderName: string; // Name of the coder's gender
    softSkills: string[]; // Array of coder's soft skills
    languageLevels: ILanguageLevel[]; // Array of coder's language proficiency levels
    technicalSkillLevels: ITechnicalSkillLevel[]; // Array of coder's technical skill proficiency levels
}

// Interface representing a coder for creating or updating data
export interface ICoderComplet {
    name: string; // Coder's name
    birthday: string; // Coder's date of birth
    description: string; // Description or bio of the coder
    urlImage: string; // URL for the coder's profile image
    genderId: number; // ID for the coder's gender (used for backend reference)
    clanId: number; // ID of the coder's clan/group
    softSkillIds: number[]; // Array of soft skill IDs (used for backend reference)
    languages: ILanguage[]; // Array of language objects (each containing a language ID and level ID)
    technicalSkills: ITechnicalSkillLevel[]; // Array of technical skill proficiency levels
}

// Interface representing a coder's language proficiency
interface ILanguageLevel {
    id: number; // Unique identifier for the language entry
    levelId: number; // ID representing the language's proficiency level
    languageName: string; // Name of the language
    levelName: string; // Name of the proficiency level (e.g., beginner, intermediate)
}

// Interface representing a coder's technical skill proficiency
interface ITechnicalSkillLevel {
    id: number; // Unique identifier for the technical skill entry
    levelId: number; // ID representing the technical skill's proficiency level
    technicalSkillName: string; // Name of the technical skill
    levelName: string; // Name of the proficiency level (e.g., expert, novice)
}

// Interface representing the basic structure of a language object
interface ILanguage {
    id: number; // Unique identifier for the language
    name: string; // Name of the language
    levelId: number; // Proficiency level ID for the language
}

// Interface used for filtering or listing coders with basic details
export interface ICoderFilter {
    id: number; // Unique identifier for the coder
    name: string; // Coder's name
    birthday: string; // Coder's date of birth
    urlImage: string; // URL for the coder's profile image
}
