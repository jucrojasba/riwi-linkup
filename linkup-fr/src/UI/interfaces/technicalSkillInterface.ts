export interface ITechicalSkill{
    id: number;
    name:string;
    label:string
    checked:boolean;
}

export interface ITechicalSkills{
    clans:ITechicalSkill[];
}