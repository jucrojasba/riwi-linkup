// IClan interface defines the structure for a clan object
export interface IClan {
    // Unique identifier for the clan
    id: number;

    // Name of the clan
    name: string;

    // Label for display purposes (could be used in UI)
    label: string;

    // Indicates whether the clan is checked (e.g., in a selection)
    checked: boolean;
}

// IClans interface represents a collection of clans
export interface IClans {
    // Array of clan objects adhering to the IClan interface
    clans: IClan[];
}

// IClanShort interface defines a simplified structure for a clan object
export interface IClanShort {
    // Unique identifier for the clan
    id: number;

    // Name of the clan
    name: string;
}

// IClansShort interface represents a collection of short clan objects
export interface IClansShort {
    // Array of short clan objects adhering to the IClanShort interface
    clans: IClanShort[];
}
