export interface IUser{
    id?: number,
    name: string,
    email: string,
    isConfirmed: boolean,
    password: string,
    phone: number,
    sector: string,
}

export interface IUserState{
    users: IUser[]
}