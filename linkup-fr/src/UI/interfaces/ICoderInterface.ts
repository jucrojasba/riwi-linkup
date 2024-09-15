export interface ICoder {
  id: number;
  urlImage: string;
  name: string;
  birthday: string;
}

export interface ICoders {
  coders: ICoder[];
}
