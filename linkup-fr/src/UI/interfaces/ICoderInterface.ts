// Defines the structure for a single coder
export interface ICoder {
  id: number;                    // Unique identifier for the coder
  urlImage: string;              // URL of the coder's image
  name: string;                  // Name of the coder
  birthday: string;              // Birthday of the coder in string format
}

// Defines the structure for a collection of coders
export interface ICoders {
  coders: Partial<ICoder>[];     // Array of coders, with optional properties
}

// Defines detailed information about a coder for backend operations
export interface ICoderBack {
  id: number;                    // Unique identifier for the coder
  name: string;                  // Name of the coder
  birthday: string;              // Birthday of the coder
  description: string;           // Description of the coder
  urlImage: string;              // URL of the coder's image
  clanId: number;                // Identifier for the coder's clan
  genderName: string;            // Name of the coder's gender
  genderId: number;              // Identifier for the coder's gender
  softSkills: string[];          // Array of soft skills associated with the coder
  languageLevels: ILanguageLevel[]; // Array of language levels for the coder
  technicalSkillLevels: ITechnicalSkillLevel[]; // Array of technical skill levels for the coder
}

// Defines the structure for language level information
export interface ILanguageLevel {
  id: number;                    // Unique identifier for the language level
  levelId: number;               // Identifier for the specific level
  languageName: string;          // Name of the language
  levelName: string;             // Name of the proficiency level
}

// Defines the structure for technical skill level information
export interface ITechnicalSkillLevel {
  id: number;                    // Unique identifier for the technical skill level
  levelId: number;               // Identifier for the specific level
  technicalSkillName: string;    // Name of the technical skill
  levelName: string;             // Name of the proficiency level
}
