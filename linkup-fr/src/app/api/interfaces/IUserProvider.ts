export interface IUserProviderRegister{
    roleId: number,
    email:string,
    token:string,
    password?:string,
    name:string,
}

export interface IUserProviderLogin{
    roleId: number,
    email:string,
    token:string,
    name:string,
    password:string
}