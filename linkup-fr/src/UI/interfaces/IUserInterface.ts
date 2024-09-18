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