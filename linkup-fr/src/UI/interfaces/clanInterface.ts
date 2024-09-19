export interface IClan{
    id: number;
    name:string;
    label:string;
    checked:boolean;
}

export interface IClans{
    clans:IClan[];
}