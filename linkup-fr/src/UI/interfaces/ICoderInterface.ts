export interface ICoder{
    id:number,
    url_image:string,
    name: string,
    birthday:string,
}

export interface ICoders{
    coders: ICoder[];
}
