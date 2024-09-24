// Interface representing a single soft skill
export interface ISoftSkill {
    id: number;         // Unique identifier for the soft skill
    name: string;      // Name of the soft skill
    label: string;     // Label for display purposes
    checked: boolean;  // Indicates if the soft skill is selected
}

// Interface representing a collection of soft skills
export interface ISoftSkills {
    clans: ISoftSkill[]; // Array of ISoftSkill objects
}
