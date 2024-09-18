export interface IUserRegister{
    name:string,
    email:string,
    password:string,
    phoneNumber:string,
    sectorId: number
}

export interface IUserLogin{
    email:string,
    password:string
}

export interface IUserBack{
    roleId:number,
    email:string,
    token:string
}