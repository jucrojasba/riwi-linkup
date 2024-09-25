// Interface for a single option in a select dropdown
export interface IOptionSelect {
    id: number;                // Unique identifier for the option
    name: string;             // Display name for the option
}

// Interface for a collection of selectable options
export interface IOptionsSelect {
    genders: IOptionSelect[];     // List of gender options
    clans: IOptionSelect[];       // List of clan options
    languages: IOptionSelect[];   // List of language options
    softSkills: IOptionSelect[];  // List of soft skill options
    techSkills: IOptionSelect[];   // List of technical skill options
}
