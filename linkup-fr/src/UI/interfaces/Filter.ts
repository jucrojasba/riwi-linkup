// Defines a filter option with an ID, name, label, and checked state
export interface FilterOption {
    id: number;          // Unique identifier for the filter option
    name: string;       // Name of the filter option
    label: string;      // Label to display for the filter option
    checked: boolean;   // Indicates if the filter option is selected
}

// Represents the state of various filters
export interface FilterState {
    languages: FilterOption[];   // Array of filter options for languages
    techSkills: FilterOption[];   // Array of filter options for technical skills
    softSkills: FilterOption[];   // Array of filter options for soft skills
    clans: FilterOption[];        // Array of filter options for clans
}
