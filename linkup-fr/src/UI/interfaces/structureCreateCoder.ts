interface ILanguage{
    id:number,
    name:string,
    levelId:number
}

interface ITechnicalSkill{
    id:number,
    technicalSkillName:string,
    levelId:number,
    levelName:string
}

export interface IStructureCreateCoder{
    name:string,
    birthday:string,
    description:string,
    urlImage:string,
    genderId:number,
    clanId:number,
    softSkillIds: number[],
    languages: ILanguage[],
    technicalSkills: ITechnicalSkill[]
}