export interface ILanguage{
    id: number;
    name:string;
    label:string;
    checked:boolean;
}

export interface ILanguages{
    clans:ILanguage[];
}