export interface ISoftSkill{
    id: number;
    name:string;
    label:string;
    checked:boolean;
}

export interface ISoftSkills{
    clans:ISoftSkill[];
}