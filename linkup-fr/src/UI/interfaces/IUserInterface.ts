export interface IUser{
    id?: number,
    name: string,
    email: string,
    isConfirmed: boolean,
    password: string,
    phone: string,
    sector: number,
}

export interface IUserState{
    users: IUser[]
}
export interface IApiResponseUser {
    user: IUserBack; 

}

export interface IUserBack {
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