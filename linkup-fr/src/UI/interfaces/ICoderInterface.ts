export interface ICoder {
  id: number;
  urlImage: string;
  name: string;
  birthday: string;
}

export interface ICoders {
  coders: Partial<ICoder>[];
}

export interface ICoderBack{
  id:number
  name:string,
  birthday:string,
  description:string,
  urlImage:string,
  clanId:number,  
  genderName:string,
  genderId:number,
  softSkills: string[],
  languageLevels: ILanguageLevel[],
  technicalSkillLevels: ITechnicalSkillLevel[]
}


export interface ILanguageLevel{
  id:number,
  levelId:number,
  languageName:string,
  levelName:string
}
export interface ITechnicalSkillLevel{
  id:number,
  levelId:number,
  technicalSkillName:string,
  levelName:string
}