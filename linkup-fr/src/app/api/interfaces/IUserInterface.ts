export interface IUser{
    name:string,
    email:string,
    password:string,
    phoneNumber:string,
    sectorId: number
}

export interface IUserBack{
    roleId:number,
    email:string,
    token:string
}