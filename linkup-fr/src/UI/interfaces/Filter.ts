export interface FilterOption {
    id:number;
    name: string;
    label: string;
    checked: boolean;
}
  
export interface FilterState {
    languages: FilterOption[];
    techSkills: FilterOption[];
    softSkills: FilterOption[];
    clans: FilterOption[];
}
