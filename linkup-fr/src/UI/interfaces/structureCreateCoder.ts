// Interface representing a language
interface ILanguage {
    id: number;            // Unique identifier for the language
    name: string;         // Name of the language
    levelId: number;      // Identifier for the language proficiency level
}

// Interface representing a technical skill
interface ITechnicalSkill {
    id: number;                     // Unique identifier for the technical skill
    technicalSkillName: string;    // Name of the technical skill
    levelId: number;                // Identifier for the technical skill level
    levelName: string;              // Name of the technical skill level
}

// Interface representing the structure for creating a coder
export interface IStructureCreateCoder {
    name: string;                // Name of the coder
    birthday: string;            // Birthday of the coder
    description: string;         // Description of the coder
    urlImage: string;            // URL of the coder's image
    genderId: number;            // Identifier for the coder's gender
    clanId: number;              // Identifier for the coder's clan
    softSkillIds: number[];      // Array of identifiers for the coder's soft skills
    languages: ILanguage[];      // Array of languages the coder knows
    technicalSkills: ITechnicalSkill[]; // Array of technical skills the coder possesses
}
