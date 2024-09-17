export interface FilterOption {
    checked: boolean;
    name: string;
    label: string;
    id:number;
}
  
export interface FilterState {
    languages: FilterOption[];
    techSkills: FilterOption[];
    softSkills: FilterOption[];
    clans: FilterOption[];
}
