export interface ICoder{
    idCoder:number
    name:string,
    birthday:string,
    description:string,
    urlImage:string,
    clanId:number,
    genderName:string,
    softSkills: string[],
    languageLevels: ILanguageLevel[],
    technicalSkillLevels: ITechnicalSkillLevel[]
}

export interface ICoderComplet {
    name: string;
    birthday: string;
    description: string;
    urlImage: string;
    genderId: number; 
    clanId: number; 
    softSkillIds: number[]; 
    languages: ILanguage[];
    technicalSkills: ITechnicalSkillLevel[];
}

interface ILanguageLevel{
    id:number,
    levelId:number,
    languageName:string,
    levelName:string
}
interface ITechnicalSkillLevel{
    id:number,
    levelId:number,
    technicalSkillName:string,
    levelName:string
}

interface ILanguage {
    id: number; 
    name: string;
    levelId: number;
}

export interface ICoderFilter{
    id:number,
    name:string,
    birthday:string,
    urlImage:string
}