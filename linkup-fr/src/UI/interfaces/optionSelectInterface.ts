export interface IOptionSelect{
    id:number,
    name:string,
}


export interface IOptionsSelect{
    genders: IOptionSelect[],
    clans:IOptionSelect[],
    languages:IOptionSelect[],
    softSkills: IOptionSelect[],
    techSkills: IOptionSelect[]
}