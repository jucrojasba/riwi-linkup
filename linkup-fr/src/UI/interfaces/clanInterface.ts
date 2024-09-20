export interface IClan{
    id: number;
    name:string;
    label:string;
    checked:boolean;
}

export interface IClans{
    clans:IClan[];
}

export interface IClanShort{
    id:number,
    name:string
}

export interface IClansShort{
    clans: IClanShort[]
}