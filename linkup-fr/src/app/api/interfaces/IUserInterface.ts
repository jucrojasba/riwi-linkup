export interface IUserRegister{
    name:string,
    email:string,
    password:string,
    phone:string,
    sector: number
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

export interface IUser {
    id:           number;
    name:         string;
    email:        string;
    isConfirmed:  boolean;
    passwordHash: string;
    passwordSalt: string;
    phoneNumber:  string;
    createdAt:    Date;
    sectorId:     number;
    sector:       IRole;
    roleId:       number;
    role:         IRole;
}

export interface IRole {
    id:    number;
    name:  string;
    users: any[];
}

export interface IPatchUserBack {
    email?: string;
    phoneNumber?: string;
}