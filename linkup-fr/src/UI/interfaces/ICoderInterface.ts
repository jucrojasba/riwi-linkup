export interface ICoder {
  id: number;
  urlImage: string;
  name: string;
  birthday: string;
}

export interface ICoders {
  coders: ICoder[];
}

export interface ICoderBack{
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