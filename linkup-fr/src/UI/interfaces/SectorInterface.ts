// Interface representing a single sector
export interface ISector {
    id: number;        // Unique identifier for the sector
    name: string;     // Name of the sector
}

// Interface representing a collection of sectors
export interface ISectors {
    sectors: ISector[]; // Array of ISector objects
}
