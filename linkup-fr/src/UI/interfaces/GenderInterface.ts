// Defines the structure for a single gender option
export interface IGender {
    id: number;                  // Unique identifier for the gender
    name: string;                // Name of the gender
    label: string;               // Label for display purposes
    checked: boolean;            // Indicates if this gender option is selected
}

// Defines the structure for a collection of genders
export interface IGenders {
    genders: IGender[];          // Array of gender options
}
