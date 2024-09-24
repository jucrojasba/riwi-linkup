// Interface representing a technical skill
export interface ITechicalSkill {
    id: number;               // Unique identifier for the technical skill
    name: string;            // Name of the technical skill
    label: string;           // Label for the technical skill (for UI purposes)
    checked: boolean;        // Indicates if the skill is selected or not
}

// Interface representing a collection of technical skills
export interface ITechicalSkills {
    clans: ITechicalSkill[]; // Array of technical skills
}
