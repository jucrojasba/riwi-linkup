// Represents a programming or spoken language
export interface ILanguage {
    id: number;          // Unique identifier for the language
    name: string;       // Name of the language
    label: string;      // Label for display purposes
    checked: boolean;   // Indicates if the language is selected
}

// Represents a collection of languages
export interface ILanguages {
    clans: ILanguage[]; // Array of languages
}
